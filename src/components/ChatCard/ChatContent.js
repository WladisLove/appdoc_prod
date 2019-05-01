import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import Radio from '../Radio'
import ChatFiles from '../ChatFiles'
import ChatSend from '../ChatSend'
import ChatMessage from '../ChatMessage'
import ScrollArea from 'react-scrollbar'
import './style.css'
import '../../icon/style.css'

class ChatContent extends React.Component {

    render() {
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': this.props.isActive});

        return (

            <div className={dialogsClass}>
                <ScrollArea
                    speed={1}
                    className="chat-card-message__area"
                    contentClassName="content chat-card-message__box"
                    horizontal={false}
                >
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hey Ya!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            isMy
                            message="Seen healthier!!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hello!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hi!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            isMy
                            message="Seen healthier!!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hey Ya!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hello!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            isMy
                            message="Seen healthier!!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hi!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hey Ya!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            isMy
                            message="Seen healthier!!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hi!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                            message="Hello!"
                            time={Date.now()}
                        />
                        <ChatMessage
                            isMy
                            message="Seen healthier!!"
                            time={Date.now()}
                        />

                </ScrollArea>
                <div className='chat-card-message__send'>
                    <ChatSend />
                </div>
            </div>

        )
    }
}

ChatContent.propTypes = {};

ChatContent.defaultProps = {};

export default ChatContent
