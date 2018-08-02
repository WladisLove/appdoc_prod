import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import ScrollArea from 'react-scrollbar'
import Button from '../Button'
import Radio from '../Radio'
import ChatFiles from '../ChatFiles'
import ChatSend from '../ChatSend'
import ChatContent from './ChatContent'
import ChatVideoContent from './ChatVideoContent'
import ChatMessage from '../ChatMessage'

import './style.css'
import '../../icon/style.css'

class ChatCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive,
            mode: this.props.mode,
        }
    }

    filesRender = (dataArr) => {
        let filesArr = [];

        dataArr.map((item, index) => {
            filesArr.push(<ChatFiles {...item} key={item.id + '' + index}/>)
        });

        return filesArr;
    };


    render() {
        const {patientName, online} = this.props;

        const rootClass = cn('chat-card');
        const statusClass = cn('chat-card-status', `chat-card-${online}`);

        const filesClass = cn('chat-card-files', {'chat-card-files-active': this.state.isActive});
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': this.state.isActive});

        const icons = ['chat1', 'telephone', "video-camera"];

        let content;
        const VideoContent = this.props.videoContent;
        switch (this.state.mode) {
            case 'chat1':
                content = <ChatContent isActive={this.state.isActive}/>;
                break;
            case 'telephone':
                break;
            case "video-camera":
                content = VideoContent;
                break;
        }

        return (
            <div className={rootClass}>
                <div className='chat-card-head'>
                    <div className='chat-card-title'>
                        <Button
                            btnText=''
                            size='small'
                            type='no-brd'
                            icon='menu'
                            svg
                            title='Открыть прикреплённые файлы'
                            style={{width: 30}}
                            onClick={() => this.setState(prev => ({isActive: !prev.isActive}))}
                        />
                        <div className='chat-card-namePatient'>{patientName}</div>
                        <div className={statusClass}>{online}</div>
                    </div>
                    <div className='chat-card-btns'>
                        <Radio icons={icons}
                               defaultValue={this.state.mode}
                               onChange={(mode) => this.setState({mode})}/>
                        <div className='chat-card-archive'>
                            <Button
                                btnText=''
                                size='small'
                                type='no-brd'
                                icon='archive-box'
                                title='В архив'
                            />
                        </div>
                    </div>
                </div>
                <div className='chat-card-body'>
                    <div className={dialogsClass}>
                            {content}
                    </div>
                    <div className={filesClass}>
                        <div className='chat-card-files__close'>
                            <Button
                                btnText=''
                                size='small'
                                type='no-brd'
                                icon='arrow_up'
                                title='Закрыть'
                                onClick={() => this.setState(prev => ({isActive: !prev.isActive}))}
                            />
                        </div>
                        {
                            this.state.isActive && 
                            <ScrollArea speed={1} className="chat-card-files__items" contentClassName="content" horizontal={false}>
                                {this.filesRender(this.props.data)}
                            </ScrollArea>
                        }
                    </div>

                </div>
            </div>
        )
    }
}

ChatCard.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    patientName: PropTypes.string,
    online: PropTypes.oneOf(['offline', 'online']),
    isActive: PropTypes.bool,
    mode: PropTypes.oneOf(['chat1', 'telephone', "video-camera"]),

    videoContent: PropTypes.node,
};

ChatCard.defaultProps = {
    data: [],
    patientName: '',
    online: 'offline',
    isActive: false,
    mode: 'chat1',
};

export default ChatCard