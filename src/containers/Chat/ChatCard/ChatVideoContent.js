import React from 'react';
import cn from 'classnames'

import ChatVideoPanel from "../../../components/ChatVideoPanel";

import ChatContent from './ChatContent'

import './style.css'
import Hoc from '../../../hoc'
import PerfectScrollbar from 'react-perfect-scrollbar'

import ChatFiles from "../../../components/ChatFiles";

class ChatVideoContent extends React.Component {
	constructor(props){
		super(props);
		this.timerInterval;
		this.state = {
			isActive: false
		}
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
    componentWillReceiveProps(nextProps) {
        this.setState({isActive: nextProps.filesActive})
    }

    filesRender = () => {
        const files = this.props.treatmFiles;
        return files.map((item, index) => {
        	if(item.data.length) {
                return (<ChatFiles {...item} key={index}/>)
			}

        });
    };
    toggleFilesArea = () => {
        (!this.state.isActive) && this.props.getAllFilesTreatment(this.props.id_treatment);
        this.setState(prev => ({isActive: !prev.isActive}));
    }

	renderCallArea = () => {
		const panelClass = cn('chat-card-video__panel', {'chat-card-video__panel-active': this.props.isActiveChat});

		let {s, m, h} = this.props.timer;
		return (<Hoc>
			<div className='chat-card-video__area'>
				<video className='chat-card-video__box'
						poster={this.props.avatar}
						autoPlay
						ref={video => this.props.setVideoOut(video)}
						></video>
				<video className='chat-card-video__mini'
						autoPlay
						ref={video => this.props.setVideoIn(video)}
						></video>
                <div className={panelClass}>
                    {this.props.receptionId &&(
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
                            uploadFiles={this.props.uploadFile}
                            sec= {s}
                            min={m}
							isUser={this.props.isUser}
                            hour={h}
                            isCalling={this.props.isCalling}/>)}

                </div>
			</div>


		</Hoc>)
	}


    render() {
        const {isActive,isActiveChat, onVideoCallBegin, onVideoCallStop} = this.props;
		const dialogsClass = cn('chat-card-dialogs', 'chat-card-dialogs-row', {'chat-card-dialogs-active': isActive});
		const filesClass = cn('chat-card-files', {'chat-card-files-active': isActiveChat});
        const attachmentsClass = cn('chat-card-files', {'chat-card-files-active': this.state.isActive});

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
						uploadFile={this.props.uploadFile}
						data={this.props.chatStory}
					/>
                </div>
                <div className={attachmentsClass}>
                    <PerfectScrollbar>
						{
							this.state.isActive && <div className='chat-card-files__items'>
								{this.filesRender()}
							</div>
                    	}
                    </PerfectScrollbar>
                </div>
			</div>

        )
    }
}

export default ChatVideoContent
