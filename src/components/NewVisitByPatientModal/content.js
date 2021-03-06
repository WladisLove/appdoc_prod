import React from 'react';
import moment from 'moment'
import {Form, message} from 'antd';
import TextArea from '../TextArea'
import Button from '../Button'
import Radio from '../Radio'
import Upload from '../Upload'
import Icon from '../Icon'
import TimePicker from '../TimePicker'
import {previewFile} from "../../helpers/modifyFiles";
import Spinner from "../Spinner";
import { Translate } from 'react-localize-redux'

const FormItem = Form.Item;

class ContentForm extends React.Component {
    state = {
        message: '',
        loading:false
    }

    handleSubmit = (e, translate) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values, "VALUES FROM NEW VISIT");
            if (!err) {
                this.setState({loading:true});
                let newDate = this.props.date;

                let response = this.props.isChoosebleTime ? (
                    newDate.setHours(values.time[1].format('HH')),
                    newDate.setMinutes(values.time[1].format('mm')),
                    {
                        ...this.props.form.getFieldsValue(),
                        comment: this.state.message,
                        date: Math.floor((newDate).getTime() / 1000),
                        file: values.file ? values.file.fileList.map((item) => {
                            return {name: item.originFileObj.name, thumbUrl: item.originFileObj.thumbUrl}
                        }) : [],
                    }
                ) : (
                    {
                        ...this.props.form.getFieldsValue(),
                        comment: this.state.message,
                        date: this.props.date,
                        id_doc: this.props.docId,
                        type: this.props.type,
                        file: values.file ? values.file.fileList.map((item) => {
                            return {name: item.originFileObj.name, thumbUrl: item.originFileObj.thumbUrl}
                        }) : [],
                    }
                );

                this.props.onSave(response).then((res)=> {
                   if(res.data.code===200) {
                       message.success(translate('notifications.recordSuccessful'));
                   } else {
                       message.error(translate('notifications.anErrorOccurred'));
                   }
                    this.props.onCancel();
                    this.setState({loading:false})
                });
            }
        });
    };

    getIconsFromType = (type) => {
        let icons;
        switch (type) {
            case "chat":
                icons = <Radio icons={['chat1']}/>;
                break;
            case "voice":
                icons = <Radio icons={['chat1','telephone']}/>;
                break;
            case "video":
                icons = <Radio icons={['chat1','telephone', "video-camera"]}/>;
                break;
            default:
                icons = <Radio icons={['chat1']}/>;
        }
        return icons;
    };

    modifyFiles = (file) => {
        if(!file.thumbUrl && !file.modify){
            file.modify = true;
            previewFile(file, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        nextProps.visible === false ? (
            this.setState({message: ''}),
                this.props.form.resetFields()
        ) : null;
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        //const {visible, date, time} = this.props;
        const date = this.props.date*1000;

        let timeElement = this.props.isChoosebleTime
            ? <div className='modal-time'>
                <Translate>
                    {({ translate }) =>
                        (<FormItem>
                            {getFieldDecorator('time', {
                                rules: [{required: true, message: translate(`reception.form.errors.timepicker`)}],
                            })(
                                <TimePicker placeholder={translate(`reception.form.timepicker`)}
                                            availableArea={this.props.availableArea}
                                            onChange={time => this.setState({time})}/>
                            )}
                        </FormItem>)
                    }
                </Translate>
            </div>
            : <div className='modal-time'>
                <Icon svg type='alarm' size={26}/>
                <div className='modal-result'>{moment(+date).format('HH:mm')}</div>
            </div>;

        return (
            <Translate>
                {({ translate }) =>
                    (<Form onSubmit={e => this.handleSubmit(e, translate)} className="NewVisitModal">
                        <div className='modal-row'>
                            <div className='modal-data'>
                                <Icon svg type='calendar' size={26}/>
                                <div className='modal-result'>{moment(+date).format('DD MMMM')}</div>
                            </div>
                            {timeElement}
                        </div>
                        <div className='modal-doctor-row'>
                            <span className="modal-doctor-title">{translate(`doctor.title`)}:</span>
                            <span className="modal-doctor-name">{this.props.doctorName}</span>
                        </div>
                        <FormItem>
                            {getFieldDecorator('type',{
                                initialValue: 'chat',
                            })(
                                this.getIconsFromType(this.props.type)
                            )}
                        </FormItem>
                        <TextArea label={translate(`reception.form.textarea.comment`)}
                                  value={this.state.message}
                                  onChange={message => this.setState({message})}
                                  className="NewVisitModal-txtarea"/>
                        <FormItem>
                            {getFieldDecorator('file')(
                                <Upload className="newMessageModal-upload"
                                        onChange={({file}) => this.modifyFiles(file)}
                                        listType = 'text'
                                        text={translate(`reception.form.uploadFile`)}/>
                            )}
                        </FormItem>
                        <Translate id="button.title.signUpFor" data={{ time: moment(date).format("D MMMM H:mm") }}>
                            <Button size='default'
                                    // btnText={`Записаться на ${moment(date).format("D MMMM H:mm")}`}
                                    btnText={" ${ time }"}
                                    htmlType="submit"
                                    type='float'
                                    disable={this.state.loading}
                                    style={{marginRight: "20px"}}

                            />
                        </Translate>
                        {this.state.loading && <Spinner isInline={true} size="small" />}
                    </Form>)
                }
            </Translate>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
