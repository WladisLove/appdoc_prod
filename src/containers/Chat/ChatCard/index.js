import React from 'react';

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

import {
	startReception, call, stop, messAboutStop, messForCloseReception, fileUploadCallback, 
	sendMessage, setVideoIn, setVideoOut
} from '../../App/chatWs'

import './style.css'


class ChatCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive,
			isActiveChat: props.isEnded ? true : false,
            mode: this.props.mode,

			duration: 0,
			

			reception_vis: false,
			treatment_vis: false,
			visit_vis: false,
		}
    }

    filesRender = () => {
		const files = this.props.treatmFiles;
        return files.map((item, index) => {
            return (<ChatFiles {...item} key={item.date}/>)
        });
    };

    

	componentWillReceiveProps(nextProps){
		// ---- TO FIX (chack)
		((''+this.props.receptionId != ''+nextProps.receptionId) && nextProps.user_mode === "doc")
				&& (
					this.props.setReceptionStatus(false),
					this.props.setChatToId(nextProps.calledID)
				);

		
		//---------
		''+this.state.mode != ''+nextProps.mode
			&& this.setState({mode: nextProps.mode})
	}

	componentDidUpdate(prevProps){
		(this.props.callback !== prevProps.callback) && this.props.callback instanceof Function ?
				(this.props.callback(), this.props.clearCallback()) : null;
	}

	startReceptionHandler = () => {	
		startReception();
		this.props.changeReceptionStatus(this.props.receptionId, "begin")
	}

	onCall = () => {	
		call();
	}

	onStop = () => {
		messAboutStop();
		stop();
	}

	beforeCloseReseption = () => {
		/* НЕ ДЕЛАЕМ завершение чата, обнуление истории на сервере*/
		this.setState({reception_vis: true});
	}

	onCloseReception = (obj) => {
		/* завершение чата, обнуление истории на сервере*/
		messAboutStop();
		stop();
		messForCloseReception();
		let new_obj = {
			...obj,
			id: this.props.receptionId,
			chat: this.props.chatStory,
		}
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
			from: this.props.callerID,
			to: this.props.calledID,
			avatar: this.props.avatar,
			online: this.props.online,
			chatStory: [...this.props.chat, ...this.props.chatStory],
			sendMessage: sendMessage,
			onEnd: this.beforeCloseReseption,
			onBegin: this.startReceptionHandler,
			receptionStarts: this.props.receptionStarts,
			fromTR_VIS: this.props.fromTR_VIS,
			user_mode: this.props.user_mode,
			uploadFile: this.uploadOnlyFile(this.props.receptionId, this.props.callerID, fileUploadCallback),
			receptionId: this.props.receptionId,
		};
		const chatAdditionalProps = {
			setVideoOut: (video)=>setVideoOut(video),
			setVideoIn: (video)=>setVideoIn(video),
			onStop: this.onStop,
			onCall: this.onCall,
			onChat: () => this.setState(prev => ({isActiveChat: !prev.isActiveChat})),
			timer: this.props.timer,
			isCalling: this.props.isCalling,
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
	setChatToId: PropTypes.func,

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
	setChatToId: () => {},
};

export default ChatCard