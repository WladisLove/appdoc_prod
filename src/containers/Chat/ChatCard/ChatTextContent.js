import React from 'react';

import PropTypes from 'prop-types'

import ChatContent from './ChatContent'

import './style.css'

class ChatTextContent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isActive: this.props.isActive,
		}
	}
    
    
    render() {

		console.log(this.props.chatStory)
        return (
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