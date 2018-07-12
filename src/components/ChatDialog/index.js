import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Rate from '../Rate'
import Icon from '../Icon'
import ProfileAvatar from '../ProfileAvatar'

import './style.css'
import '../../icon/style.css'
import { format } from 'util';

class ChatDialog extends React.Component{
    constructor(props){
        super(props);
        let timeDifference = Math.floor((+this.props.start) - Date.now()/1000);
        this.state = {
            status: 
            (timeDifference < 900 && timeDifference > 0)
                    ? 'soon' : 'default'
        }
    }

    handleClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    render(){
        const { fio, comment, size, avatar, type, id, id_user,
            online, status} = this.props;
        const rootClass = cn('dialog-item',  `dialog-status-${this.state.status}`);

        const key_val = {
            'chat': 'chat1',
            'voice': 'telephone', 
            'video': "video-camera",
        }
        let time = this.state.status === 'soon' ? 
            'через ' 
            + Math.floor(((+this.props.start) - (Date.now()/1000))/60) 
            + ' мин.'
            : moment((+this.props.start)*1000).format('HH:mm');

        return (
            <div className={rootClass} 
                onClick={(e) => {
                    this.handleClick(e);
                    this.props.onGotoChat(id);
                }}>
                <div className="flex-col" > 
                    <ProfileAvatar owner="patient" online={online} img={avatar} size={size}/>
                </div>
                <div className="flex-col">
                    <div className="dialog-item-name">
                        <div className='go-to' 
                            onClick={(e) => {
                                this.handleClick(e);
                                this.props.onGoto(id_user);
                            }}>{fio}</div>
                    </div>
                    <div className="dialog-item-consultation">{comment}</div>
                </div>
                <div className="flex-col">
                    <div className='dialog-item-time'>
                        {time}
                    </div>
                    <Button className='dialog-item-extra' 
                        //onClick={this.showModal}
                        size='file'
                        type='file'
                        svg
                        icon='emergency-call'
                        iconSize={25}
                    />
                    <Button className='dialog-item-type' 
                        //onClick={this.showModal}
                        size='file'
                        type='file'
                        svg
                        icon={key_val[type]}
                        iconSize={16}
                    />
                </div>
            </div>
        )
    }
}

ChatDialog.propTypes = {
    id: PropTypes.number,
    avatar: PropTypes.string,
    fio: PropTypes.string,
    status: PropTypes.oneOf(['extra', 'default', 'soon']),
    type: PropTypes.string,
    onGoto: PropTypes.func,
    onGotoChat: PropTypes.func,
};

ChatDialog.defaultProps = {
    id: 0,
    avatar: '',
    fio: '',
    size: 'small',
    status: 'default',
    type: 'chat',
    onGoto: () => {},
    onGotoChat: () => {},
};

export default ChatDialog
