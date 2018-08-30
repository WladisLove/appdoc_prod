import React from 'react';
import Card from '../Card'
import Button from '../Button'
import './style.css'
import '../../icon/style.css'
import TextArea from "../TextArea";
import Upload from "../Upload";
import {Form, Alert, message} from "antd";
import {previewFile} from "../../helpers/modifyFiles";
import Modal from "../Modal";
import Spinner from "../Spinner";

const FormItem = Form.Item;

class NewEmergencyVisitForm extends React.Component {
    constructor(props) {
        super(props);

    }
    state = {
        shouldWriteComment: false,
        showSubmitError: false,
        isSubmitInProgress: false
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (!values.comment) {
                    this.setState({shouldWriteComment: true})
                } else {
                    let obj = {comment: values.comment, id_doc: 1};


                    if (values.file) {
                        obj.file = values.file.fileList.map((item, index) => {
                            console.log(item);
                            return {name: item.name, thumbUrl: item.originFileObj.thumbUrl}
                        })
                    }

                    console.log(obj, "EMERGENCY VISIT OBJECT");
                    this.setState({isSubmitInProgress: true});
                    this.props.onSubmit(obj)
                        .then((res) => {
                                if (res.data.code === 200) {
                                    message.success('Заявка отправлена');
                                    this.props.onCancel();
                                    this.setState({isSubmitInProgress: false});
                                }
                                else {
                                    this.setState({isSubmitInProgress: false});
                                    message.error('Произошла ошибка при отправке заявки');
                                }
                            }
                        )
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
        if (this.props.visible !== nextProps.visible && nextProps.visible === true) {
            this.setState({
                shouldWriteComment: false,
                showSubmitError: false,
                isSubmitInProgress: false
            });
            this.props.form.resetFields();
        }
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
                                {getFieldDecorator('comment',{
                                    rules: [{required: true, message: 'Опишите жалобу',}],
                                })(
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
                            <div className="new-emergency-visit-content-submit">
                                <Button size='default'
                                        btnText='Отправить'
                                        htmlType="submit"
                                        disable={this.state.isSubmitInProgress}
                                        type='emergency'
                                />
                                {this.state.isSubmitInProgress && <div className="new-emergency-visit-content-submit-spinner"><Spinner/></div>}
                            </div>
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