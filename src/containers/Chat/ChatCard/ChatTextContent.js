import React, {Component} from 'react';
import PropTypes from 'prop-types'
import ChatContent from './ChatContent'

import './style.css'
import PerfectScrollbar from "react-perfect-scrollbar";
import cn from "classnames";
import ChatFiles from "../../../components/ChatFiles";



class ChatTextContent extends Component {
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
    render() {
        const {isActive} = this.props;
        const dialogsClass = cn('chat-card-dialogs', 'chat-card-dialogs-row', {'chat-card-dialogs-active': isActive});
        const filesClass = cn('chat-card-files only-chat', {'chat-card-files-active': true});
        const attachmentsClass = cn('chat-card-files', {'chat-card-files-active': this.state.isActive});
        return (

            <div className={dialogsClass}>
                <div className={filesClass}>
                    <ChatContent
                        {...this.props}
                        onSend={mes => this.props.sendMessage({
                            id: 'chat',
                            from: this.props.from,
                            to: this.props.to,
                            ...mes,
                        })}
                        chatMode="chat"
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
        );
    }
}

ChatTextContent.propTypes = {
	sendMessage: PropTypes.func,
	uploadFile: PropTypes.func,
};

ChatTextContent.defaultProps = {
	sendMessage: () => {},
	uploadFile: () => {},
};

export default ChatTextContent
