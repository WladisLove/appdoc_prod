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
        //fileList.map(file => {
            this.setState({isGenerated: false})
            previewFile(file.originFileObj, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
                /*that.setState((prev) => {
                    return {
                        ...prev,
                        isGenerated: fileList.length == prev.generatedList.length + 1,
                        generatedList:[...prev.generatedList, file],
                    }
                });*/
                that.setState({
                    isGenerated: true,
                    fileInfo: {
                        fileSend: file,
                        isConclusion: isConclusion,
                    },
                });
                /*if (fileList.length == that.state.generatedList.length + 1){
                    that.pushFiles([...that.state.generatedList, file], isConclusion);
                }*/
            });
        //})
    }
    
    uploadFiles = (e, isConclusion) => {
        this.setState({isGenerated: false}) 
        isConclusion
                ? this.setState(state => {return {
                    conclusionList:[...state.conclusionList, e.file], 
                }})
                : this.setState(state => {return {
                    fileList:[...state.fileList, e.file]
                }})

        /*if(!e.event){
            isConclusion
                ? this.setState(state => {return {
                    conclusionList:[...state.conclusionList, e.file], 
                }})
                : this.setState(state => {return {
                    fileList:[...state.fileList, e.file]
                }})
        }*/
        
    }

    pushFiles = (e, isConclusion) => {
        
            this.modifyFiles(e.file, isConclusion);
            /*if(this.state.isGenerated){
                isConclusion ? 
                (
                    this.props.uploadConclusion(_file)
                    //this.setState({conclusionList: []})
                ) : (
                    this.props.uploadFiles(_file)
                    //this.setState({fileList: []})
                );
            }*/
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

                if(this.state.isGenerated && this.state.fileInfo){
                    this.state.fileInfo.isConclusion ? 
                    (
                        this.props.uploadConclusion(this.state.fileInfo.fileSend)
                        //this.setState({conclusionList: []})
                    ) : (
                        this.props.uploadFiles(this.state.fileInfo.fileSend)
                        //this.setState({fileInfo: null})
                    );
                    //this.setState({fileInfo: null})
                }

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