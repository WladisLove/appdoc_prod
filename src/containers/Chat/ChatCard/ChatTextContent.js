import React from 'react';

import PropTypes from 'prop-types'

import ChatContent from './ChatContent'

import './style.css'

const ChatTextContent = props => {
        return (
			<ChatContent 
				{...props} 
				onSend={mes => props.sendMessage({
						 id: 'chat',
						 from: props.from,
						 to: props.to,
						 ...mes,
					 })}
				chatMode="chat"
				uploadFile={props.uploadFile}
				data={props.chatStory}  
		    />
        )

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