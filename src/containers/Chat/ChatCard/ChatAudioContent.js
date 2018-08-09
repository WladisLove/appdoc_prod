import React from 'react';

import PropTypes from 'prop-types'
import cn from 'classnames'

import {ChatVideoPanel} from "appdoc-component";

import ChatContent from './ChatContent'

import './style.css'


import Hoc from '../../../hoc'

class ChatAudioContent extends React.Component {
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

	renderCallArea = () => {
		const panelClass = cn('chat-card-video__panel', {'chat-card-video__panel-active': this.props.isActiveChat});

		let {s, m, h} = this.props.timer;
		return (<Hoc>
			<div className='chat-card-message__area'>
				<video className='chat-card-video__box' 
						ref={video => this.props.setVideoOut(video)}
						autoPlay
						poster='http://bipbap.ru/wp-content/uploads/2017/04/72fqw2qq3kxh.jpg'
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

		
		console.log(this.props.isCalling);
		let audioContent = this.renderCallArea()

        return (

            <div className={dialogsClass}>
				{audioContent}
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

ChatAudioContent.propTypes = {
	videoCalling: PropTypes.bool,
	wsURL: PropTypes.string.isRequired,
};

ChatAudioContent.defaultProps = {
	videoCalling: false,
	wsURL: '',
};

export default ChatAudioContent