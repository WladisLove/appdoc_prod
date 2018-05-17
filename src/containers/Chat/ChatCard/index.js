import React from 'react';
import kurentoUtils from 'kurento-utils'

import PropTypes from 'prop-types'
import cn from 'classnames'

import { Button, Radio,ChatFiles, ChatSend, ChatMessage,
	CompletionReceptionModal,
	CompleteAppeal,
	NewVisitModalPage, } from 'appdoc-component'


import ChatTextContent from './ChatTextContent'
import ChatVideoContent from './ChatVideoContent'
import ChatAudioContent from './ChatAudioContent'
import Hoc from '../../../hoc'

import './style.css'

var videoInput;
var videoOutput;
var webRtcPeer;

var registerName = null;
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
			console.info('Received message: ' + message.data);
		
			switch (parsedMessage.id) {
			case 'registerResponse':
				this.resgisterResponse(parsedMessage);
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
				console.info("Communication ended by remote peer");
				this.stop(true);
				break;
			case 'chat':
				console.log('[chat]', parsedMessage);
				this.setState({chatStory: [...this.state.chatStory, parsedMessage]})
				break;
			case 'chatHistory':
				console.log('[chatHistory]', parsedMessage);
				(parsedMessage.chat.length > 0 && !this.state.receptionStarts)
					? this.setState({
						receptionStarts: true,
						chatStory: parsedMessage.chat,
					})
					: this.setState({chatStory: parsedMessage.chat});
				break;
			case 'iceCandidate':
				webRtcPeer.addIceCandidate(parsedMessage.candidate)
				break;
			default:
				console.error('Unrecognized message', parsedMessage);
			}
		}
    }

    filesRender = (dataArr) => {
        let filesArr = [];

        dataArr.map((item, index) => {
            filesArr.push(<ChatFiles {...item} key={item.id + '' + index}/>)
        });

        return filesArr;
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
		this.register();
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
			this.stop(true);
		} else {
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
			var response = {
				id : 'incomingCallResponse',
				from : message.from,
				callResponse : 'reject',
				message : 'bussy'
	
			};
			return this.sendMessage(response);
		}
	
		this.setCallState(PROCESSING_CALL);
		if (window.confirm('User ' + message.from
		+ ' is calling you. Do you accept the call?')) {
			this.setState({receptionStarts: true, isCalling: true, to: message.from})
	
			
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
							this.setCallState(NO_CALL);
						}
	
						this.generateOffer(function(error, offerSdp) {
							if (error) {
								console.error(error);
								this.setCallState(NO_CALL);
							}
							var response = {
								id : 'incomingCallResponse',
								from : message.from,
								callResponse : 'accept',
								sdpOffer : offerSdp,
								mode: that.state.mode,
								receptionId: that.props.receptionId,
							};
							that.sendMessage(response);
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

	register = () => {
		let a = window.prompt();
		let name = a ? a : ''+this.props.callerID;
		let mode = window.confirm('Are you doctor?') 
			? 'doc' : 'user';
		this.setState({from: name});

		this.setRegisterState(REGISTERING);
	
		const answer = window.prompt('Enter ID to call');
        if (answer == '') {
            window.alert("You must specify the peer name");
            return;
        }
		this.setState({to: answer});
		
		this.ws.onopen = () => this.sendMessage({
			id : 'register',
			name : name,
			other_name: answer,
			doc_name: mode === 'doc' ? name : answer,
			mode,
		});
	}

	startReception = () => {												
		this.sendMessage({
			id : 'startReception',
			name : this.state.from,
			other_name: this.state.to,
		});
		this.setState({receptionStarts: true});
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
				var message = {
					id : 'stop'
				}
				this.sendMessage(message);
			}
		}
	}

	sendMessage = (message) => {
		this.ws.send(JSON.stringify(message));
	}

	onIceCandidate = (candidate) => {
		var message = {
			id : 'onIceCandidate',
			candidate : candidate
		}
		this.sendMessage(message);
    }
	
	call = () => {
		!this.state.receptionStarts && this.setState({receptionStarts: true});
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
                this.setCallState(NO_CALL);
            }

	
			const {from, to} = that.state;
    
            this.generateOffer(function(error, offerSdp) {
                if (error) {
                    console.error(error);
                    this.setCallState(NO_CALL);
				}
                var message = {
                    id : 'call',
                    from,
                    to,
                    sdpOffer : offerSdp
                };
				that.sendMessage(message);
            });
        });
    
    }

	onCall = () => {		
		this.call();
	}
	onStop = () => {
		this.stop();
	}

	beforeCloseReseption = () => {
		/* НЕ ДЕЛАЕМ завершение чата, обнуление истории на сервере*/
		this.setState({reception_vis: true});

	}

	onCloseReception = (obj) => {
		/* завершение чата, обнуление истории на сервере*/
		/* отправка чата, диагноза, isHronic */

		//console.log('[onCloseReception]');
		//console.log(obj)
		let new_obj = {
			...obj,
			id: 120635,
			chat: this.state.chatStory,
		}
		//console.log(new_obj)
		this.props.completeReception(new_obj);

		this.setState({reception_vis: false,treatment_vis: true});
	}

	onAddVisit = (obj) => {

		this.setState({reception_vis: false,treatment_vis: true});
	}

	onGotoNextUser = () => {
		/* Сменить обстановку чата под другого user */
	}
	

    render() {
        const {patientName, user_id, online} = this.props;

        const rootClass = cn('chat-card');
        const statusClass = cn('chat-card-status', `chat-card-${online}`);

        const filesClass = cn('chat-card-files', {'chat-card-files-active': this.state.isActive});
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': this.state.isActive});

        const icons = ['chat1', 'telephone', "video-camera"];

		let content;
		let commonProps = {
			ws: this.ws,
			from: this.state.from,
			to: this.state.to,
			receptionStarts: this.state.receptionStarts,
			chatStory: this.state.chatStory,
			onEnd: this.beforeCloseReseption,
			onBegin: this.startReception,
			sendMessage: this.sendMessage,
			uploadFiles: this.props.uploadFiles,
			uploadConclusion: (arr) => {console.log('uploadConclusion',arr)}
		};
		let notTextProps = {
			setVideoOut: (video)=>videoOutput=video,
			setVideoIn: (video)=>videoInput=video,
			onStop: this.onStop,
			onCall: this.onCall,
			onChat: () => this.setState(prev => ({isActiveChat: !prev.isActiveChat})),
			timer: this.state.timer,
			isCalling: this.state.isCalling,
			isActiveChat: this.state.isActiveChat,
			isEnded: this.props.isEnded,
		};
        switch (this.state.mode) {
            case 'chat':
                content = <ChatTextContent isActive={this.state.isActive} 
                                        	{...commonProps}/>;
                break;
			case 'voice':
				content = <ChatAudioContent 
											{...commonProps}
											{...notTextProps}
                                            />;
                break;
            case "video":
                content = <ChatVideoContent 
											{...commonProps}
											{...notTextProps}
                                            />;
                break;
        }

        return (
			<Hoc>
            <div className={rootClass}>
                <div className='chat-card-head'>
                    <div className='chat-card-title'>
                        <Button
                            btnText=''
                            size='small'
                            type='no-brd'
                            icon='menu'
                            svg
                            title='Открыть прикреплённые файлы'
                            style={{width: 30}}
                            onClick={() => this.setState(prev => ({isActive: !prev.isActive}))}
                        />
                        <div className='chat-card-namePatient'>{patientName}</div>
                        <div className={statusClass}>{online}</div>
                    </div>
                    <div className='chat-card-btns'>
                        <Radio icons={icons}
                               defaultValue={this.state.mode}
                               onChange={(mode) => this.setState({mode: mode.target.value})}/>
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
                                onClick={() => this.setState(prev => ({isActive: !prev.isActive}))}
                            />
                        </div>
                        {
                            this.state.isActive && <div className='chat-card-files__items'>
                                {this.filesRender(this.props.data)}
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
				onComplete={()=> console.log('[CompleteAppeal]')}
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
    data: PropTypes.arrayOf(PropTypes.object),
	patientName: PropTypes.string,
	user_id: PropTypes.number,
    online: PropTypes.oneOf(['offline', 'online']),
    isActive: PropTypes.bool,
	mode: PropTypes.oneOf(['chat', 'voice', "video"]),
	isEnded: PropTypes.bool,

    videoContent: PropTypes.node,
};

ChatCard.defaultProps = {
    data: [],
	patientName: '',
	user_id: 0,
    online: 'offline',
    isActive: false,
	mode: 'chat',
	
};

export default ChatCard