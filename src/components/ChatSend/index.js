import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Input, Upload } from 'antd';
import Button from '../Button'

import {previewFile} from '../../helpers/modifyFiles'

import './style.css'
import '../../icon/style.css'

class ChatSend extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.value,
            fileList: [],
            generatedList: [],
            isGenerated: true,
            conclusionList: [],
        }
    }

    modifyFiles = (file, isConclusion) => {
        let that = this;
        this.setState({isGenerated: false})
            previewFile(file.originFileObj, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
                
                that.setState({
                    isGenerated: true,
                });
                that.props.uploadFiles(file, isConclusion)
            });
    }

    pushFiles = (e, isConclusion) => {
        console.log(e)
        this.modifyFiles(e.file, isConclusion);
    }

    sendHandler = () => {        
        this.inp.focus();
        this.props.send({
            text: this.state.value,
            date: Math.floor(Date.now()/1000),
        });
        this.setState({value: ''});
    }

    componentDidMount(){
        this.inp.focus();
    }

    render(){
        const { TextArea } = Input;
        const {message, attachment, disable} = this.props;
        const rootClass = cn('message__send');
        
        return (
            <div className={rootClass}>
                <div className='message__send-smileys'>
                    <Button
                        btnText=''
                        size='small'
                        type='no-brd'
                        icon='emoticon-face'
                    />
                </div>
                <div className='message__send-area'>
                    <TextArea 
                        ref={inp => this.inp = inp}
                        value = {this.state.value}
                        onChange = { e => {
                            e.target.value.charCodeAt(e.target.value.length - 1) === 10 
                                ? (!disable && this.sendHandler())
                                : this.setState({value: e.target.value})
                        }}
                        placeholder="Ваше сообщение..." 
                        autosize />
                </div>
                <div className='message__send-btns'>
                    <Upload //multiple={true}
                    disable = {true}
                        showUploadList={false}
                        fileList={this.state.conclusionList}
                        onChange = {(e) => !disable && this.pushFiles(e,true)}>
                        {!this.props.isUser && (<Button
                                btnText=''
                                size='small'
                                type='no-brd'
                                icon='result'
                                title='Добавить заключение'
                                onClick={e => e.preventDefault()}
                        />)}
                    </Upload>
                    <Upload
                        //multiple={true}
                        showUploadList={false}
                        fileList={this.state.fileList}
                        onChange = {(e) => {
                            !disable && this.pushFiles(e)
                        }}>
                        <Button
                            btnText=''
                            size='small'
                            type='no-brd'
                            icon='clip'
                            title='Прикрепить файл'
                        />
                    </Upload>
                    {this.state.isGenerated &&  <Button
                        className='message__send-send'
                        btnText=''
                        title='Отправить сообщение'
                        disable = {disable}
                        onClick = {this.sendHandler}
                    />}
                    {this.props.isUser ? 
                    (<Button
                        btnText='оставить отзыв'
                        size='default'
                        type='yellow'
                        disable = {disable}
                        onClick={this.props.makeReview}
                    />)
                    : (<Button
                        btnText='завершить прием'
                        size='default'
                        type='yellow'
                        disable = {disable}
                        onClick={this.props.closeVisit}
                    />)}
                </div>
            </div>
        )
    }
}

ChatSend.propTypes = {
    value: PropTypes.string,
    attachment: PropTypes.string,
    disable: PropTypes.bool,
    send: PropTypes.func,
    closeVisit: PropTypes.func,
    isUser: PropTypes.bool,
    makeReview: PropTypes.func,
};

ChatSend.defaultProps = {
    value: '',
    attachment: '',
    disable: true,
    send: () => {},
    closeVisit: () => {},
    isUser: false,
    makeReview: () => {},
};

export default ChatSend