import React from 'react';

import PropTypes from 'prop-types'
import cn from 'classnames'

import ChatVideoPanel from "../../../components/ChatVideoPanel";

import ChatContent from './ChatContent'

import './style.css'


import Hoc from '../../../hoc'
import PerfectScrollbar from "react-perfect-scrollbar";
import ChatFiles from "../../../components/ChatFiles";

class ChatAudioContent extends React.Component {
	constructor(props){
		super(props);
		this.timerInterval;
        this.state = {
            isActive: false
        }
	}
    toggleFilesArea = () => {
        (!this.state.isActive) && this.props.getAllFilesTreatment(this.props.id_treatment);
        this.setState(prev => ({isActive: !prev.isActive}));
    }
    filesRender = () => {
        const files = this.props.treatmFiles;
        return files.map((item, index) => {
            if(item.data.length) {
                return (<ChatFiles {...item} key={index}/>)
            }

        });
    };
    componentWillReceiveProps(nextProps) {
        this.setState({isActive: nextProps.filesActive})
    }
	renderCallArea = () => {
		const panelClass = cn('chat-card-video__panel', {'chat-card-video__panel-active': this.props.isActiveChat});
		const avatar = this.props.avatar;
		let {s, m, h} = this.props.timer;
		return (<Hoc>
			<div className='chat-card-video__area'>
				<video className='chat-card-video__box'
						ref={video => this.props.setVideoOut(video)}
						autoPlay
						poster={avatar}
						></video>
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
                        uploadFiles={this.props.uploadFile}
                        isUser={this.props.isUser}
                        sec= {s}
                        min={m}
                        hour={h}
                        isCalling={this.props.isCalling}/>

                </div>
			</div>

		</Hoc>)
	}


    render() {
        const {isActive,isActiveChat} = this.props;
		const dialogsClass = cn('chat-card-dialogs', 'chat-card-dialogs-row', {'chat-card-dialogs-active': isActive});
		const filesClass = cn('chat-card-files', {'chat-card-files-active': isActiveChat});
        const attachmentsClass = cn('chat-card-files', {'chat-card-files-active': this.state.isActive});

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

ChatAudioContent.propTypes = {
	videoCalling: PropTypes.bool,
	wsURL: PropTypes.string.isRequired,
};

ChatAudioContent.defaultProps = {
	videoCalling: false,
	wsURL: '',
};

export default ChatAudioContent
