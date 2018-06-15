import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { ChatVideoPanel } from 'appdoc-component'
import ChatContent from './ChatContent'

import './style.css'


//import { Icon, Row, Col, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../../hoc'


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



class ChatVideoContent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			from: 0,
			to: 0,
			isActive: this.props.isActive,
		}

		this.timerInterval;

		this.ws = props.ws;
	}

	/*renderPlayer = () => {
		console.log('renderPlayer',this.props.fileURL)
		return (<Hoc>
			<div className='chat-card-message__area'>
				<video className='chat-card-video__box' 
						 preload="auto" 
						 controls
						>
					<source src={webm} />
						
					<p>Ваш браузер не поддерживает просмотр</p> 
					<a href={webm}>Скачать видео</a>
				</video>
			</div>
		</Hoc>)
	}*/

	renderCallArea = () => {
		const panelClass = cn('chat-card-video__panel', {'chat-card-video__panel-active': this.props.isActiveChat});

		let {s, m, h} = this.props.timer;
		return (<Hoc>
			<div className='chat-card-message__area'>
				<video className='chat-card-video__box' 
						poster='http://bipbap.ru/wp-content/uploads/2017/04/72fqw2qq3kxh.jpg'
						autoPlay
						ref={video => this.props.setVideoOut(video)}
						></video>
				<video className='chat-card-video__mini' 
						autoPlay
						ref={video => this.props.setVideoIn(video)}
						></video>
			</div>
				<div className={panelClass}>
					<ChatVideoPanel  
								onStop={() => {
									this.props.onStop();
								}} 
								onCall={() => {
									!this.props.receptionStarts && 
										this.props.onBegin();
									this.props.onCall();
								}} 
								onChat = {this.props.onChat}
								sec= {s}
								min={m}
								hour={h}
								isCalling={this.props.isCalling}/>

				</div>
		</Hoc>)
	}
    
    
    render() {
        const {isActive,isActiveChat, videoCalling, onVideoCallBegin, onVideoCallStop} = this.props;
		const dialogsClass = cn('chat-card-dialogs', 'chat-card-dialogs-row', {'chat-card-dialogs-active': isActive});
		const filesClass = cn('chat-card-files', {'chat-card-files-active': isActiveChat});

		
			let videoContent = /*this.props.isEnded ?
			this.renderPlayer() :*/ this.renderCallArea()

        return (

            <div className={dialogsClass}>
				{videoContent}
				<div className={filesClass}>
					 <ChatContent 
					 {...this.props}
					 onSend={mes => this.props.sendMessage({
						 id: 'chat',
						 from: this.props.from,
						 to: this.props.to,
						 ...mes,
					 })}
						 data={this.props.chatStory}
					/>
                </div>
			</div>

        )
    }
}

ChatVideoContent.propTypes = {
	videoCalling: PropTypes.bool,
	wsURL: PropTypes.string.isRequired,
};

ChatVideoContent.defaultProps = {
	videoCalling: false,
	wsURL: '',
};

export default ChatVideoContent