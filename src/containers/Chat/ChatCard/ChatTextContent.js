import React from 'react';

import PropTypes from 'prop-types'

import { Button, Radio, ChatFiles, ChatSend, ChatMessage, ChatVideoPanel } from 'appdoc-component'
import ChatContent from './ChatContent'

import './style.css'


//import { Icon, Row, Col, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../../hoc'


class ChatTextContent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isActive: this.props.isActive,
		}
	}
    
    
    render() {
		console.log('from:', this.props.from, 'to', this.props.to)
		const {isActive} = this.props;

        return (
            <ChatContent onSend={mes => this.props.sendMessage({
						 id: 'chat',
						 from: this.props.from,
						 to: this.props.to,
						 ...mes,
                     })}
                     isActive = {isActive}
					 data={this.props.chatStory}
					 from={this.props.from}  
					 onBegin = {this.props.onBegin}
					 onEnd = {this.props.onEnd}
					 receptionStarts = {this.props.receptionStarts}
					 uploadFiles= {this.props.uploadFiles}
					uploadConclusion = {this.props.uploadConclusion}
		    />
        )
    }
}

ChatTextContent.propTypes = {
	wsURL: PropTypes.string.isRequired,
	sendMessage: PropTypes.func,
	onBegin: PropTypes.func,
	onEnd: PropTypes.func,
};

ChatTextContent.defaultProps = {
	wsURL: '',
	sendMessage: () => {},
	onBegin: () => {},
	onEnd: () => {},
};

export default ChatTextContent