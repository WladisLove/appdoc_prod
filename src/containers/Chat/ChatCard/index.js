import React from 'react';
import kurentoUtils from 'kurento-utils'

import PropTypes from 'prop-types'
import cn from 'classnames'


import Button from '../../../components/Button'
import Radio from "../../../components/Radio";
//import ChatFiles from '../../../components/ChatFiles'
import ChatFiles from '../../../components/ChatFiles'
import CompletionReceptionModal from "../../../components/CompletionReceptionModal";
import CompleteAppeal from '../../../components/CompleteAppeal'
import NewVisitModalPage from "../../../components/NewVisitModalPage";


import ChatTextContent from './ChatTextContent'
import ChatVideoContent from './ChatVideoContent'
import ChatAudioContent from './ChatAudioContent'
import Hoc from '../../../hoc'

import './style.css'

var videoInput;
var videoOutput;
var webRtcPeer;

const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;
var registerState = null



const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;
var callState = null


class ChatCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive,
			isActiveChat: props.isEnded ? true : false,
            mode: this.props.mode,

            from: 0,
			to: 0,
			duration: 0,
			timer: {
				s: 0,
				m: 0,
				h: 0,
			},
			receptionStarts: false,
			isCalling: false,
			chatStory: [],

			reception_vis: false,
			treatment_vis: false,
			visit_vis: false,
		}
        this.ws = new WebSocket(props.wsURL);
        this.ws.onmessage = (message) => {
			var parsedMessage = JSON.parse(message.data);
			console.log("receive new mes", parsedMessage);
		
			switch (parsedMessage.id) {
			case 'registerResponse':
				this.resgisterResponse(parsedMessage);
				break;
			case 'startReception':
				this.setState({receptionStarts: true});
				break;
			case 'closeReception':
				this.setState({receptionStarts: false});
				break;
			case 'callResponse':
				this.callResponse(parsedMessage);
				break;
			case 'incomingCall':
				this.incomingCall(parsedMessage);
				break;
			case 'startCommunication':
				this.startCommunication(parsedMessage);
				break;
			case 'stopCommunication':
				this.stop(true);
				break;
			case 'chat':
				console.log('[CHAT]', [...this.state.chatStory, parsedMessage]);
				this.setState({chatStory: [...this.state.chatStory, parsedMessage]})
				break;
			case 'chatHistory':
				(parsedMessage.chat.length > 0)
					? this.setState({
						receptionStarts: true,
						chatStory: parsedMessage.chat,
					})
					: null;
				break;
			case 'iceCandidate':
				webRtcPeer.addIceCandidate(parsedMessage.candidate)
				break;
			default:
				console.error('Unrecognized message', parsedMessage);
			}
		}
    }

    filesRender = () => {
		const files = this.props.treatmFiles;
        return files.map((item, index) => {
            return (<ChatFiles {...item} key={item.date}/>)
        });
    };

    timer = () => {
		this.state.timer.s >= 59 
			? (
				this.state.timer.m >= 59 
					? (
						this.setState(prev => ({timer: {
							h: prev.timer.h +1,
							s: 0,
							m: 0,
						}}))
					)
					: this.setState(prev => ({timer: {
						...prev.timer,
						m: prev.timer.m +1,
						s: 0,
					}}))
			)
			: 
			this.setState(prev => ({timer: {
				...prev.timer,
				s: prev.timer.s +1,
			}}));
	}

	componentWillMount(){

		// TOFIX
		/*this.props.user_mode === "user" ? 
			this.register(''+this.props.callerID, ''+2697, this.props.user_mode) 
			: this.register(''+this.props.callerID, ''+this.props.user_id, this.props.user_mode);*/
		this.register(''+this.props.callerID, ''+this.props.user_id, this.props.user_mode);
	}

	componentWillReceiveProps(nextProps){
		// ---- TO FIX (chack)
		(''+this.props.receptionId != ''+nextProps.receptionId) && nextProps.user_mode === "doc"
			? (
				this.register(''+nextProps.callerID, ''+nextProps.user_id, nextProps.user_mode),
				this.setState({receptionStarts: false})
			) : null;
		//---------
		''+this.state.mode != ''+nextProps.mode
			&& this.setState({mode: nextProps.mode})
	}

	componentWillUnmount(){
		clearInterval(this.timerInterval);
		this.ws.close();
	}

	setRegisterState = (nextState) => {
		switch (nextState) {
		case REGISTERED:
			this.setCallState(NO_CALL);
			break;
		default:
			return;
		}
		registerState = nextState;
	}

	setCallState = (nextState) => {
		nextState === IN_CALL ? this.timerInterval = setInterval(this.timer, 1000) : null;
		callState = nextState;
	}

	resgisterResponse = (message) => {
		if (message.response == 'accepted') {
			this.setRegisterState(REGISTERED);
		} else {
			this.setRegisterState(NOT_REGISTERED);
			var errorMessage = message.message ? message.message
					: 'Unknown reason for register rejection.';
			console.log(errorMessage);
			window.alert('Error registering user. See console for further information.');
		}
	}

	callResponse = (message) => {
		if (message.response != 'accepted') {
			console.info('Call not accepted by peer. Closing call');
			var errorMessage = message.message ? message.message
					: 'Unknown reason for call rejection.';
			console.log(errorMessage);
			this.sendMessage({
				id : 'chat',
				type: "notBegin",
				name: this.props.patientName,
				from : this.state.from,
				to: this.state.to,
				date: Math.ceil(Date.now()/1000),
			});
			this.stop(true);
		} else {
			this.sendMessage({
				id : 'chat',
				type: "begin",
				name: this.props.patientName,
				from : this.state.from,
				to: this.state.to,
				date: Math.ceil(Date.now()/1000),
			});
			this.setCallState(IN_CALL);
			webRtcPeer.processAnswer(message.sdpAnswer);
		}
	}

	startCommunication = (message) => {
		this.setCallState(IN_CALL);
		webRtcPeer.processAnswer(message.sdpAnswer);
	}

	incomingCall = (message) => {
		// If bussy just reject without disturbing user
		if (callState != NO_CALL) {
			return this.sendMessage({
				id : 'incomingCallResponse',
				from : message.from,
				callResponse : 'reject',
				message : 'bussy'
	
			});
		}
	
		this.setCallState(PROCESSING_CALL);
		if (window.confirm('User ' + message.from
		+ ' is calling you for '+message.receptionId+' visit. Do you accept the call?')) {
			this.setState({receptionStarts: true, isCalling: true, to: message.from})
	
			!this.props.receptionId && this.props.onSelectReception(message.receptionId);


			var options = this.state.mode === 'video' ? 
				{
					localVideo : videoInput,
					remoteVideo : videoOutput,
					mediaConstraints: {  
						audio:true,  
						video:true,  
					},
					onicecandidate : this.onIceCandidate
				} : {
					localVideo : videoInput,
					remoteVideo : videoOutput,
					mediaConstraints: {  
						audio:true,  
						video:false  
					},
					onicecandidate : this.onIceCandidate
				};
			
			let that = this;
	
			webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
					function(error) {
						if (error) {
							console.error(error);
							that.setCallState(NO_CALL);
						}
	
						this.generateOffer(function(error, offerSdp) {
							if (error) {
								console.error(error);
								that.setCallState(NO_CALL);
							}
							that.sendMessage({
								id : 'incomingCallResponse',
								from : message.from,
								callResponse : 'accept',
								sdpOffer : offerSdp,
								mode: that.state.mode,
							});
						});
					});
	
		} else {
			var response = {
				id : 'incomingCallResponse',
				from : message.from,
				callResponse : 'reject',
				message : 'user declined'
			};
			this.sendMessage(response);
			this.stop(true);
		}
	}

	register = (id1, id2, user_mode) => {
		this.setState({from: id1, to: id2});
		this.setRegisterState(REGISTERING);

		this.ws.onopen = () => this.sendMessage({
			id : 'register',
			name : id1,
			other_name: id2,
			//doc_name: user_mode === 'doc' ? id1 : id2,
			mode: user_mode,
		});
	}

	startReception = () => {	
												
		this.sendMessage({
			id : 'startReception',
			name : this.state.from,
			other_name: this.state.to,
		});
		this.sendMessage({
			id : 'chat',
			from : this.state.from,
			to: this.state.to,
			date: Math.ceil(Date.now()/1000),
			isDate: true,
		});
		this.setState({receptionStarts: true,});
		this.props.changeReceptionStatus(this.props.receptionId, "begin")
	}

	checkTimeFormat = (number) => {
        return (''+number).length < 2 ? '0'+number : number;
	}
	
	stop = (message) => {
		this.setState({isCalling: false});
		clearInterval(this.timerInterval);
		this.setState({timer: {
			s: 0,
			m: 0,
			h: 0,
		}})
		this.setCallState(NO_CALL);
		if (webRtcPeer) {
			webRtcPeer.dispose();
			webRtcPeer = null;
	
			if (!message) {
				this.sendMessage({
					id : 'stop'
				});
			}
		}
	}

	sendMessage = (message) => {
		console.log("[sendMessage]", message);
		this.ws.send(JSON.stringify(message));
	}

	onIceCandidate = (candidate) => {
		this.sendMessage({
			id : 'onIceCandidate',
			candidate : candidate
		});
    }
	
	call = () => {
		!this.state.receptionStarts && this.setState({receptionStarts: true});
		//!this.state.receptionStarts && this.startReception();
		this.setState({isCalling: true});
		this.setCallState(PROCESSING_CALL);
    
		let options = this.state.mode === 'video' ? 
				{
					localVideo : videoInput,
					remoteVideo : videoOutput,
					onicecandidate : this.onIceCandidate
				} : {
					mediaConstraints: {  
						audio:true,  
						video:false  
					},
					onicecandidate : this.onIceCandidate
				};

		let that = this;
    
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(
                error) {
            if (error) {
                console.error(error);
                that.setCallState(NO_CALL);
            }

			const {from, to} = that.state;

            this.generateOffer(function(error, offerSdp) {
                if (error) {
                    console.error(error);
                    that.setCallState(NO_CALL);
				}
				that.sendMessage({
                    id : 'call',
                    from,
					to,
					receptionId: that.props.receptionId,
                    sdpOffer : offerSdp
                });
            });
        });
    
    }

	onCall = () => {	
		//!this.state.receptionStarts && this.startReception();
		this.call();
	}

	messAboutStop = () => {
		const {s,m,h} = this.state.timer;
		console.log(s,m,h, s || m || h)
		if(s || m || h){
			const callTime = h 
				? this.checkTimeFormat(h) +':'+ this.checkTimeFormat(m) +':'+ this.checkTimeFormat(s)
				: this.checkTimeFormat(m) +':'+ this.checkTimeFormat(s);
			this.sendMessage({
				id: 'chat',
				from: this.state.from,
				to: this.state.to,
				date: Math.ceil(Date.now()/1000),
				type: "stop",
				callTime,
			});
		}
	}

	onStop = () => {
		this.messAboutStop();
		this.stop();
	}

	beforeCloseReseption = () => {
		/* НЕ ДЕЛАЕМ завершение чата, обнуление истории на сервере*/
		this.setState({reception_vis: true});

	}

	onCloseReception = (obj) => {
		/* завершение чата, обнуление истории на сервере*/
		this.messAboutStop();
		this.stop();
		let new_obj = {
			...obj,
			id: this.props.receptionId,
			chat: this.state.chatStory,
		}
		this.sendMessage({
			id : 'closeReception',
			name : this.state.from,
			other_name: this.state.to,
		});
		this.sendMessage({
			id : 'chat',
			from : this.state.from,
			to: this.state.to,
			date: Math.ceil(Date.now()/1000),
			isVisEnd: true,
		});
		this.props.completeReception(new_obj);
		this.props.changeReceptionStatus(this.props.receptionId, "finish");

		this.setState({reception_vis: false,treatment_vis: true});
		this.props.extr ?
			this.setState({reception_vis: false})
			: this.setState({reception_vis: false,treatment_vis: true});
	}

	onCloseTreatment = () => {
		this.props.closeTreatm(this.props.id_treatment);
		this.setState({treatment_vis: false});
	}

	onAddVisit = (obj) => {

		this.setState({reception_vis: false,treatment_vis: true});
	}
	
	uploadOnlyFile = (id_zap,id_user, callback) => {
		return (file, isConclusion) => {
			isConclusion ? 
				this.props.uploadConclusion(id_zap,file, callback)
				: this.props.uploadFile(id_zap,id_user, file,callback);
			this.state.isActive && this.props.getAllFilesTreatment(this.props.id_treatment);
		}
	}

	fileUploadCallback = (serverResponse) => {
		console.log('[fileUploadCallback]', serverResponse)
		this.sendMessage({
			id: 'chat',
			from: this.state.from,
			to: this.state.to,
			date: Math.ceil(Date.now()/1000),
			...serverResponse,
		});
	}

	toggleFilesArea = () => {
		(!this.state.isActive) && this.props.getAllFilesTreatment(this.props.id_treatment);
		this.setState(prev => ({isActive: !prev.isActive}));
	}

    render() {
		const {patientName, user_id, online: onl} = this.props;
		const online = +onl ?'online' :  'offline';

        const statusClass = cn('chat-card-status', `chat-card-${online}`);
        const filesClass = cn('chat-card-files', {'chat-card-files-active': this.state.isActive});
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': this.state.isActive});
	
		let content;
		
		const chatProps= {
			ws: this.ws,
			from: this.state.from,
			to: this.state.to,
			chatStory: [...this.props.chat, ...this.state.chatStory],
			sendMessage: this.sendMessage,
			onEnd: this.beforeCloseReseption,
			onBegin: this.startReception,
			receptionStarts: this.state.receptionStarts,
			fromTR_VIS: this.props.fromTR_VIS,
			user_mode: this.props.user_mode,
			uploadFile: this.uploadOnlyFile(this.props.receptionId, this.state.from, this.fileUploadCallback),
			receptionId: this.props.receptionId,
		};
		const chatAdditionalProps = {
			setVideoOut: (video)=>videoOutput=video,
			setVideoIn: (video)=>videoInput=video,
			onStop: this.onStop,
			onCall: this.onCall,
			onChat: () => this.setState(prev => ({isActiveChat: !prev.isActiveChat})),
			timer: this.state.timer,
			isCalling: this.state.isCalling,
			isActiveChat: this.state.isActiveChat,
			isEnded: this.props.isEnded,
		}
        switch (this.state.mode) {
            case 'chat':
                content = <ChatTextContent isActive={this.state.isActive} 		
											{...chatProps}
                                            />;
                break;
			case 'voice':
				content = <ChatAudioContent 
											{...chatProps}
											{...chatAdditionalProps}
                                            />;
                break;
            case "video":
                content = <ChatVideoContent 
											{...chatProps}
											{...chatAdditionalProps}
                                            />;
                break;
		}
		
        return (
			<Hoc>
            <div className='chat-card'>
                <div className='chat-card-head'>
                    <div className='chat-card-title'>
                        <Button
                            btnText=''
                            size='small'
                            type='no-brd'
                            icon='file'
                            svg
                            title='Открыть прикреплённые файлы'
                            style={{width: 30}}
                            onClick={this.toggleFilesArea}
                        />
                        <div className='chat-card-namePatient'>{patientName}</div>
                        <div className={statusClass}>{online}</div>
                    </div>
                    <div className='chat-card-btns'>
                        <Radio icons={['chat1', 'telephone', "video-camera"]}
							   value={this.state.mode}
							   onChange = {() => {}}
                               /*onChange={(mode) => this.setState({mode: mode.target.value})}*//>
                        <div className='chat-card-archive'>
                            <Button
                                btnText=''
                                size='small'
                                type='no-brd'
                                icon='archive-box'
                                title='В архив'
                            />
                        </div>
                    </div>
                </div>
                <div className='chat-card-body'>
                    <div className={dialogsClass}>
                            {content}
                    </div>
                    <div className={filesClass}>
                        <div className='chat-card-files__close'>
                            <Button
                                btnText=''
                                size='small'
                                type='no-brd'
                                icon='arrow_up'
                                title='Закрыть'
                                onClick={this.toggleFilesArea}
                            />
                        </div>
                        {
                            this.state.isActive && <div className='chat-card-files__items'>
                                {this.filesRender()}
                            </div>
                        }
                    </div>

                </div>
            </div>
			<CompletionReceptionModal 
				visible={this.state.reception_vis}
				onComplete={obj=> this.onCloseReception(obj)}
				onCancel={() => this.setState({reception_vis: false})}
			/>
			<CompleteAppeal 
				visible={this.state.treatment_vis}
				onCancel={() =>  this.setState({treatment_vis: false})}
				onAdd={() => this.setState({treatment_vis: false, visit_vis: true})}
				onComplete={this.onCloseTreatment}
			/>
			<NewVisitModalPage 
				visible={this.state.visit_vis}
				onCancel={() => this.setState({visit_vis: false, treatment_vis: true})}
				userName={patientName}
				id={user_id}
				onSave={e=> console.log('[NewVisitModal]', e)}
			/>
			</Hoc>
        )
    }
}

ChatCard.propTypes = {
	treatmFiles: PropTypes.arrayOf(PropTypes.object),
	chat: PropTypes.array,
	patientName: PropTypes.string,
	user_id: PropTypes.number,
    online: PropTypes.number,//oneOf(['offline', 'online']),
    isActive: PropTypes.bool,
	mode: PropTypes.oneOf(['chat', 'voice', "video"]),
	isEnded: PropTypes.bool,
	treatmFiles: PropTypes.array,
	changeReceptionStatus: PropTypes.func,
	uploadFile: PropTypes.func,
	getAllFilesTreatment: PropTypes.func,

    videoContent: PropTypes.node,
};

ChatCard.defaultProps = {
    treatmFiles: [],
	patientName: '',
	user_id: 0,
    online: 0,
    isActive: false,
	mode: 'chat',
	chat: [],
	treatmFiles: [],
	changeReceptionStatus: () => {},
	uploadFile: () => {},
	getAllFilesTreatment: () => {},
};

export default ChatCard