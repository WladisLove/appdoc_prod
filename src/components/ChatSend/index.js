import React from 'react';
import PropTypes from 'prop-types'

import { Input, Upload, Modal } from 'antd';
import Button from '../Button'
import { Translate } from 'react-localize-redux'
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
        this.state.value && (this.props.send({
            text: this.state.value,
            date: Math.floor(Date.now()/1000),
        }),
        this.setState({value: ''}))
    }

    componentDidMount(){
        this.inp.focus();
    }

    conclusionAddingHandler = (e, translate) => {
        const {disable, isCurVisEnd} = this.props;
        let that = this;
        if(!disable || isCurVisEnd){

            Modal.confirm({
                title: translate('modal.confirm.attachConclusion'),
                //content: 'Some descriptions',
                onOk() {
                    that.pushFiles(e,true);
                },
                onCancel() {},
              });

        }
        else {
            Modal.error({
                title: translate('modal.error.errorToAttachConclusion'),
            });
        }
    }

    fileAddingHandler = (e, translate) => {
        const {disable} = this.props;
        if(!disable) {
            this.pushFiles(e,false);
        }
        else {
            Modal.error({
                title: translate('modal.error.errorToAttachFile'),
              });
        }


    }

    render(){
        const { TextArea } = Input;
        const {message, attachment, disable} = this.props;

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<div className='message__send'>
                        <div className='message__send-area'>
                            <TextArea
                                ref={inp => this.inp = inp}
                                value = {this.state.value}
                                onChange = { e => {
                                    e.target.value.charCodeAt(e.target.value.length - 1) === 10
                                        ? (!disable && this.sendHandler())
                                        : this.setState({value: e.target.value})
                                }}
                                placeholder={`${translate('form.textarea.chat')}...`}
                                autosize />
                        </div>
                        <div className='message__send-btns'>
                            <Upload //multiple={true}
                                disable = {true}
                                showUploadList={false}
                                fileList={this.state.conclusionList}
                                onChange = {(e) => this.conclusionAddingHandler(e, translate)}>
                                {!this.props.isUser && (<Button
                                        btnText=''
                                        size='small'
                                        type='no-brd'
                                        icon='result'
                                        title={translate('button.title.addConclusion')}
                                />)}
                            </Upload>
                            <Upload
                                //multiple={true}
                                showUploadList={false}
                                fileList={this.state.fileList}
                                onChange = {(e) => this.fileAddingHandler(e, translate)}>
                                <Button
                                    btnText=''
                                    size='small'
                                    type='no-brd'
                                    icon='clip'
                                    title={translate('attachFile')}
                                />
                            </Upload>
                            {this.state.isGenerated && <Button
                                className='message__send-send'
                                btnText=''
                                title={translate('button.title.sendMessage')}
                                disable = {disable}
                                onClick = {this.sendHandler}
                            />}
                            {this.props.isUser ?
                            (<Button
                                btnText={translate('button.title.addReview')}
                                size='default'
                                type='yellow'
                                disable = {disable}
                                onClick={this.props.makeReview}
                            />)
                            : (<Button
                                btnText={translate('button.title.receptionComplete')}
                                size='default'
                                type='yellow'
                                disable = {disable}
                                onClick={this.props.closeVisit}
                            />)}
                        </div>
                    </div>)
                }
            </Translate>
        </div>)
    }
}

ChatSend.propTypes = {
    value: PropTypes.string,
    attachment: PropTypes.string,
    disable: PropTypes.bool,
    send: PropTypes.func,
    closeVisit: PropTypes.func,
    isUser: PropTypes.bool,
    isCurVisEnd: PropTypes.bool,
    makeReview: PropTypes.func,
};

ChatSend.defaultProps = {
    value: '',
    attachment: '',
    disable: true,
    send: () => {},
    closeVisit: () => {},
    isUser: false,
    isCurVisEnd: false,
    makeReview: () => {},
};

export default ChatSend
