import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'


import { Button, ChatSend, ChatMessage, ChatComments } from 'appdoc-component'

import './style.css'

class ChatContent extends React.Component {

    shouldComponentUpdate(nextProps){
        return this.props.data.length !== nextProps.data.length 
                || this.props.receptionStarts !== nextProps.receptionStarts;
    }

    render() {
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': this.props.isActive});

        console.log('CHAT ', this.props.data)

        return (

            <div className={dialogsClass}>
                <div className='chat-card-message__area'>
                    <div className='chat-card-message__comments'>
                     <ChatComments {...this.props.comment}/>  
                     </div>

                    <div className='chat-card-message__box'>
                        <div className='chat-card-message__overlay'>
                        {
                                this.props.data.map((e, i) => {
                                    return ( <ChatMessage
                                        img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                                        {...e}
                                        isMy={e.from === this.props.from}
                                        key={e.date + '' + i}
                                    />)
                                })
                            }
                            <div className='btn-start'>
                                {this.props.fromTR_VIS === 2 && !this.props.receptionStarts
                                && <Button
                                    btnText='Начать приём'
                                    size='small'
                                    type='yellow'
                                    onClick={this.props.onBegin}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.fromTR_VIS === 2 &&
                (<div className='chat-card-message__send'>
                    <ChatSend 
                        disable={!this.props.receptionStarts}
                        closeVisit={this.props.onEnd}
                        send={message => this.props.onSend(message)}/>
                </div>)
                }
            </div>

        )
    }
}

ChatContent.propTypes = {
    onSend: PropTypes.func,
    data: PropTypes.array,
    onBegin: PropTypes.func,
    receptionStarts: PropTypes.bool,
    onEnd: PropTypes.func,
    comment: PropTypes.shape({
        comments: PropTypes.string,
        files: PropTypes.array,
    })
};

ChatContent.defaultProps = {
    onSend: () => {},
    data: [],
    onBegin: () => {},
    receptionStarts: false,
    onEnd: () => {},
    comment: {
        comments: "",
        files: [],
    }
};

export default ChatContent