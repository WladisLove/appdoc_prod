import React from 'react';
import Card from '../Card'
import Button from '../Button'
import './style.css'
import '../../icon/style.css'
import Upload from "../Upload";
import {Form, Alert, message} from "antd";
import {previewFile} from "../../helpers/modifyFiles";
import Modal from "../Modal";
import Spinner from "../Spinner";
import { Translate } from 'react-localize-redux'
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

    handleSubmit = (e, translate) => {
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
                                    message.success(translate("notifications.requestSubmitted"));
                                    this.props.onCancel();
                                    this.setState({isSubmitInProgress: false});
                                }
                                else {
                                    this.setState({isSubmitInProgress: false});
                                    message.error(translate("notifications.anErrorOccurredSendRequest"));
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


    componentDidMount() {
        this.props.form.setFieldsValue({comment : "vgasd"})
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible, onCancel} = this.props;

        return (
            <Modal visible={visible}
                   onCancel={onCancel}
            >
            <Translate>
                {({ translate }) =>
                    <Form onSubmit={(e) => this.handleSubmit(e, translate)}
                        className="newEmergencyVisit">
                            <Card title={<Translate id="emergencyCallRequest" />}>
                                <Translate>
                                    {({ translate }) =>
                                        (<div className="new-emergency-visit-content">
                                            <div className="textarea-label">{translate('emergencyVisit.describeProblem')}</div>
                                            <FormItem>
                                                {getFieldDecorator('comment',{
                                                    rules: [{
                                                        required: true,
                                                        message: translate('emergencyVisit.describeComplaint')
                                                    }],
                                                    initialValue: ""
                                                })(
                                                    <textarea className="textarea-field"/>
                                                )}
                                            </FormItem>

                                            <FormItem>
                                                {getFieldDecorator('file')(
                                                        <Upload className="newEmergencyVisit-upload"
                                                                onChange={({file}) => this.modifyFiles(file)}
                                                                listType='text'
                                                                text={translate('attachFile')}/>
                                                )}
                                            </FormItem>
                                            <div className="new-emergency-visit-content-submit">
                                                <Button size='default'
                                                        btnText={translate('button.title.submit')}
                                                        htmlType="submit"
                                                        disable={this.state.isSubmitInProgress}
                                                        type='emergency'
                                                />
                                                {this.state.isSubmitInProgress && <div className="new-emergency-visit-content-submit-spinner"><Spinner/></div>}
                                            </div>
                                            {this.state.shouldWriteComment && <Alert message={translate('reasonForTreatment.reasonForTreatment')} type="error"/>}
                                        </div>)
                                    }
                                </Translate>
                            </Card>
                        </Form>}
                </Translate>                    
            </Modal>
        )
    }
}

const NewEmergencyVisit = Form.create()(NewEmergencyVisitForm);


export default NewEmergencyVisit
