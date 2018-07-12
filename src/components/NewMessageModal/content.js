import React from 'react';

import {Form} from 'antd';
import Icon from '../Icon'
import TextArea from '../TextArea'
import Upload from '../Upload'
import Button from '../Button'

import {previewFile} from '../../helpers/modifyFiles'

const FormItem = Form.Item;

class ContentForm extends React.Component {
    state = {
        message: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let response = {
            file: this.props.form.getFieldValue('file') 
                ? (this.props.form.getFieldValue('file').fileList) 
                : [],
            message: this.state.message,
            to: this.props.id,
        };
        this.props.onSend(response)
    };

    componentWillReceiveProps(nextProps){
        nextProps.visible == false ? (this.setState({message: ''}), this.props.form.resetFields()) : null;

    }

    shouldComponentUpdate(nextProps){
        return nextProps.visible
    }

    modifyFiles = (file) => {
        if(!file.thumbUrl && !file.modify){
            file.modify = true;
            let that = this;
            previewFile(file.originFileObj, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
            });
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}
                  className="newMessageModal">
                <div className="newMessageModal-user">
                    <div className="newMessageModal-user-icon">
                        <Icon type="user" size={24}/>
                    </div>
                    <div className="newMessageModal-user-name">
                        {this.props.userName}
                    </div>
                </div>

                <TextArea label='Текст сообщения'
                          value={this.state.message}
                            onChange={message => this.setState({message})}
                          className="newMessageModal-txtarea"
                />
                <FormItem>
                    {getFieldDecorator('file')(
                        <Upload className="newMessageModal-upload"
                                onChange={({file}) => this.modifyFiles(file)}
                                listType = 'text'
                                text="Прикрепить файл"/>
                    )}
                </FormItem>
                <Button size='default'
                        btnText='Отправить'
                        htmlType="submit"
                        type='float'/>
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
