import React from 'react';

import Card from '../Card'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'
import PatientCalendarCarousel from "../PatientCalendarCarousel";
import Radio from "../Radio";
import TextArea from "../TextArea";
import Upload from "../Upload";
import moment from "moment";
import {Form} from "antd";
import {previewFile} from "../../helpers/modifyFiles";
import Select from "../Select";

import {timeIntervals} from "./stories/mock-data"
import Modal from "../Modal";
const FormItem = Form.Item;

class NewFreeVisitByPatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "video",
            timeStamp: null,
            shouldChooseTime: false
        }
    }

    getIconsFromType = (type) => {
        let icons;
        switch (type) {
            case "chat":
                icons = <Radio icons={['chat1']}/>;
                break;
            case "voice":
                icons = <Radio icons={['chat1', 'telephone']}/>;
                break;
            case "video":
                icons = <Radio icons={['chat1', 'telephone', "video-camera"]}/>;
                break;
            default:
                icons = <Radio icons={['chat1']}/>;
        }
        return icons;
    };

    getTimeStampFromCarousel = (timeStamp, type) => {
        if(timeStamp) {this.setState({shouldChooseTime: false})}
        this.setState({
            timeStamp,
            type,

        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.timeStamp) {
            this.setState({shouldChooseTime: true});
            return
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let obj = {
                    type: values.type,
                    timeStamp: this.state.timeStamp,
                    docType: values.docType
                }

                values.comment ? obj.comment=values.comment : null;

                if(values.file) {
                    obj.file = values.file.fileList.map((item, index) => { return {name: item.name, thumbUrl: item.thumbUrl}})
                }
                console.log(obj, "makeNewAppointment")
            } else { console.log(err, "ERROR")}

        });
    };
    modifyFiles = (file) => {
        if(!file.thumbUrl && !file.modify){
            file.modify = true;
            previewFile(file.originFileObj, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
            });
        }
    };

    renderOptions = () => {
        return this.props.docTypes.map((docType, i) => {
            return (
                <Select.Option value={docType}
                               key={`my_patient_${i}`}>
                    {docType}</Select.Option>)
        })
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        const {visible, onCancel} = this.props;

        return (
            <Modal visible={visible}
                   onCancel={onCancel}
            >
            <Form onSubmit={this.handleSubmit}
                  className="NewFreeVisitByPatient">
                <div className='patient-page-new-free-visit'>
                    <Card>
                        <div className="new-visit-content">
                            <span className="chose-doc-type">Выберете категорию врача</span>
                            <FormItem>
                                {getFieldDecorator('docType',{
                                    rules: [{
                                        required: true,
                                        message: 'Выберете тип доктора'
                                    }]
                                })(
                                    <Select placeholder="Категория врача">
                                        {this.renderOptions()}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                <div className="typeOfVisit">
                                    <div className="chose-visit-type"> Выберите тип связи </div>
                                    {getFieldDecorator('type', {
                                        initialValue: 'chat'
                                    })(
                                        this.getIconsFromType(this.state.type)

                                    )}
                                </div>

                            </FormItem>
                            <PatientCalendarCarousel
                                intervals = {timeIntervals}
                                makeActive={this.getTimeStampFromCarousel}
                                shouldChooseTime = {this.state.shouldChooseTime}
                            />





                            <FormItem>
                                {getFieldDecorator('comment', {
                                    initialValue: this.state.comment
                                })(
                                    <TextArea label='Комментарий к приему'
                                              className="NewVisitModal-txtarea"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('file')(
                                        <Upload className="newVisitDocPageeModal-upload"
                                                onChange={({file}) => this.modifyFiles(file)}
                                                listType='text'
                                                text="Прикрепить результаты исследований"/>
                                )}
                            </FormItem>
                            <Button size='default'
                                    btnText={`Записаться ${this.state.timeStamp ? `на ${moment(this.state.timeStamp*1000).format("D MMMM H:mm")}`:``}`}
                                    htmlType="submit"
                                    type='float'/>
                        </div>
                    </Card>
                </div>
            </Form>
            </Modal>
        )
    }
}

const NewFreeVisitByPatient = Form.create()(NewFreeVisitByPatientForm);


export default NewFreeVisitByPatient