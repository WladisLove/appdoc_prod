import React from 'react';
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

import Card from '../Card'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'
import PatientCalendarCarousel from "../PatientCalendarCarousel";
import Radio from "../Radio";
import TextArea from "../TextArea";
import Upload from "../Upload";
import moment from "moment";
import {Form, message} from "antd";
import {previewFile} from "../../helpers/modifyFiles";
import Spinner from "../Spinner";
import { Translate } from 'react-localize-redux'


const FormItem = Form.Item;

class DoctorPageNewVisitForm extends React.Component {
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

    handleSubmit = (e, translate) => {
        e.preventDefault();
        if(!this.state.timeStamp) {
            this.setState({shouldChooseTime: true});
            return
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                let obj = {
                    type: values.type,
                    date: this.state.timeStamp
                };

                values.comment ? obj.comment=values.comment : null;

                if (values.file) {
                    obj.file = values.file.fileList.map((item) => {
                        return {name: item.originFileObj.name, thumbUrl: item.originFileObj.thumbUrl}
                    })
                }
                this.props.onMakeNewAppointment(obj).then((res)=>{
                    if(res.data.code===200) {
                        const mes = translate('notifications.recordSuccessful')
                        message.success(mes);

                    } else {
                        const mes = translate('notifications.anErrorOccurred')
                        message.error(mes)
                    }
                    this.setState({loading:false,timeStamp: 0})
                    this.props.form.resetFields();
                });
            } else { console.log(err, "ERROR")}

        });
    };
    modifyFiles = (file) => {
        if(!file.thumbUrl && !file.modify){
            file.modify = true;
            previewFile(file, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
            });
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const intervals = this.props.docIntervalsWithAppsAll;
        return (<div>
            <Translate>
                {({ translate }) =>
                    (<Form onSubmit={(e) => this.handleSubmit(e, translate)}
                          className="DoctorPageNewVisit">
                        <div className='doctor-page-new-visit'>
                            <Card title={translate('button.title.signUpForReception')}>
                                <div className="new-visit-content">
                                    <div className="legend">
                                        <span className="AppAfterAnalyses">{translate('reception.byResults')}</span>
                                        <span className="AppWithVideoAudio">{translate('audioVideoConsultations')}</span>
                                    </div>
                                    <PatientCalendarCarousel
                                        intervals={intervals}
                                        makeActive={this.getTimeStampFromCarousel}
                                        shouldChooseTime = {this.state.shouldChooseTime}
                                    />

                                    <FormItem>
                                        <div className="typeOfVisit">
                                            <span> {translate('patient.form.connectionType')} </span>
                                            {getFieldDecorator('type', {
                                                initialValue: 'chat'
                                            })(
                                                this.getIconsFromType(this.state.type)
                                            )}
                                        </div>

                                    </FormItem>

                                    <FormItem>
                                        {getFieldDecorator('comment', {
                                            initialValue: this.state.comment
                                        })(
                                            <TextArea label={translate('reception.form.textarea.comment')}
                                                      className="NewVisitModal-txtarea"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('file')(
                                                <Upload className="newVisitDocPageeModal-upload"
                                                        onChange={({file}) => this.modifyFiles(file)}
                                                        listType='text'
                                                        text={translate('reception.form.uploadFile')} />
                                        )}
                                    </FormItem>
                                    <div>
                                        <Button size='default'
                                                btnText={this.state.timeStamp ? translate('button.title.signUpOnDate', {date: moment(this.state.timeStamp*1000).format("D MMMM H:mm")}) : translate('button.title.signUp')}
                                                htmlType="submit"
                                                disable={this.state.loading}
                                                type='float'
                                                style={{marginRight: "20px"}}

                                        />
                                        {this.state.loading && <Spinner isInline={true} size="small" />}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Form>)
                }
            </Translate>
        </div>)
    }
}

const DoctorPageNewVisit = Form.create()(DoctorPageNewVisitForm);


export default DoctorPageNewVisit
