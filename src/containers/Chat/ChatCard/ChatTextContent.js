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
					 data={props.chatStory}  
		    />
        )

}

ChatTextContent.propTypes = {
	sendMessage: PropTypes.func,
};

ChatTextContent.defaultProps = {
	sendMessage: () => {},
};

export default ChatTextContent