import React from 'react';
import Card from '../Card'
import Button from '../Button'
import './style.css'
import '../../icon/style.css'
import TextArea from "../TextArea";
import Upload from "../Upload";
import {Form, Alert} from "antd";
import {previewFile} from "../../helpers/modifyFiles";
import Modal from "../Modal";

const FormItem = Form.Item;

class NewEmergencyVisitForm extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        shouldWriteComment: false
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (!values.comment) {
                    this.setState({shouldWriteComment: true})
                } else {
                    let obj = {comment: values.comment};


                    if (values.file) {
                        obj.file = values.file.fileList.map((item, index) => {
                            console.log(item);
                            return {name: item.name, thumbUrl: item.originFileObj.thumbUrl}
                        })
                    }
                    this.props.onSubmit(obj);
                }

            } else {
                console.log(err, "ERROR")
            }

        });
    };
    modifyFiles = (file) => {
        console.log(file);
        if(!file.thumbUrl && !file.modify){
            file.modify = true;
            previewFile(file, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
            });
        }
    };
    componentWillReceiveProps(nextProps){
        nextProps.visible === false ? (this.setState({shouldWriteComment: false}),
            this.props.form.resetFields()) : null;
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible, onCancel} = this.props;

        return (
            <Modal visible={visible}
                   onCancel={onCancel}
            >
            <Form onSubmit={this.handleSubmit}
                  className="newEmergencyVisit">
                    <Card title = "Заявка на экстренный вызов">
                        <div className="new-emergency-visit-content">
                            <FormItem>
                                {getFieldDecorator('comment')(
                                    <TextArea label='Жалоба, причина обращения'
                                              className="newEmergencyVisit-txtarea"
                                              onChange = { (val) => {val && this.setState({shouldWriteComment:false})}}

                                    />
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('file')(
                                        <Upload className="newEmergencyVisit-upload"
                                                onChange={({file}) => this.modifyFiles(file)}
                                                listType='text'
                                                text="Прикрепить файлы"/>
                                )}
                            </FormItem>
                            <Button size='default'
                                    btnText='Отправить'
                                    htmlType="submit"
                                    type='float'
                                    style={{
                                        backgroundColor: "#ef5350",
                                        color: "white",
                                        alignSelf:"center",
                                        border: "none",
                                        marginBottom: 10

                                    }}

                            />
                            {this.state.shouldWriteComment && <Alert message="Напишите причину обращения" type="error"/>}
                        </div>
                    </Card>
                </Form>
            </Modal>
        )
    }
}

const NewEmergencyVisit = Form.create()(NewEmergencyVisitForm);


export default NewEmergencyVisit