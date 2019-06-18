import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Form, message } from 'antd'

import ProfileAvatar from '../ProfileAvatar'
import Button from '../Button'
import Icon from '../Icon'
import { Translate } from 'react-localize-redux'
import './style.css'
import '../../icon/style.css'
import InputNew from "../InputNew";
import Spinner from "../Spinner";
const FormItem = Form.Item;

class PatientAccardionContactItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            passwordsRequired: false,
            avatar: {}
        }
    }

    handleSubmitInfo = (e, translate) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loadingInfo:true});
                if(this.state.avatar) {
                    values.avatar = {...this.state.avatar}
                }
                this.props.onSubmit(values)
                    .then((res) => {
                        this.setState({loadingInfo: false});
                        if (res.data.code === 200) {
                            message.success(translate('notifications.saved'))
                        } else {
                            message.error(translate('notifications.anErrorOccurredTryAgain'))
                        }
                    })
            } else {
                console.log(err);
            }
        });
    };

    handleSubmitPassword = (e, translate) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loadingPass:true});

                this.props.onSubmitPassword(values.oldPassField, values.newPassField)
                    .then((res) => {
                        this.setState({loadingPass: false});
                        if (res.data.code === 200) {
                            message.success(translate("notifications.saved"))
                        } else if(res.data.code===601){
                            message.error(translate('personal.form.errors.input.password.wrongOldPassword'))
                        }
                        else{
                            message.error(<Translate id="notifications.anErrorOccurredTryAgain"/>)
                        }
                    })
            } else {
                console.log(err);
            }
        });
    };

    handleChange = (e) => {
        e.preventDefault();
        if(e.target.value && !this.state.passwordsRequired) {
            this.setState({passwordsRequired: true}, () => {
                this.props.form.validateFields(['oldPassField', 'newPassField', 'repeatPassField'], { force: true })});
        } else if(!e.target.value){
            this.setState({passwordsRequired: false}, () => {
                this.props.form.validateFields(['oldPassField', 'newPassField', 'repeatPassField'], { force: true })});
        }
    };

    handleChangeAvatar = (event, isReset) => {
        if (isReset === true) {
            this.props.onDeleteAvatar();
            this.setState({
                avatar: ""
            });
            event.target.files = [];
        }
        else {
            let file = event.target.files[0];
            if (file && file.type.indexOf("image/") !== -1) {
                const reader = new FileReader();
                reader.addEventListener('load', () => this.setState({
                    avatar: ({thumbUrl: reader.result, name: file.name})
                }));
                reader.readAsDataURL(file);
            }
        }
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassField')) {
            callback(<Translate id="personal.form.errors.input.password.doNotMatch"/>);
        } else {
            callback();
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const { contactFio, contactPhone, contactEmail, contactAddress, contactAvatar} = this.props;
        const rootClass = cn('patient-contacts');

        return (
            <Form className={rootClass}>
                <Translate>
                    {({ translate }) =>
                        (<div>
                            <div className='patient-contacts-title'>{translate(`personal.contacts`)}</div>
                            <div className='patient-contacts-block'>
                                <div className='patient-contacts-avatar'>
                                    <ProfileAvatar
                                        img={this.state.avatar.thumbUrl ? this.state.avatar.thumbUrl : contactAvatar}
                                        owner='patient'
                                        size="large"
                                        online={true}
                                    />
                                    <div className='patient-contacts-controls'>
                                        <div className="file-upload">
                                            <label className="file-upload-label">
                                                <Icon type='retweet' size={16}/>
                                            </label>
                                            <input className="file-upload-input" type="file" name="photo-upload"
                                                   onChange={this.handleChangeAvatar}/>
                                        </div>
                                        <Button
                                            btnText=''
                                            size='icon'
                                            type='icon'
                                            icon='close'
                                            iconSize={13}
                                            onClick={(event) => this.handleChangeAvatar(event, true)}
                                        />
                                    </div>
                                </div>
                                <div className='patient-contacts-info'>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('fioField', {
                                            initialValue: contactFio,
                                            rules: [{ required: true,
                                                message: translate(`personal.form.errors.input.fullName`)
                                            }],
                                        })(
                                            <InputNew width ="100%" bubbleplaceholder={translate(`personal.form.input.fullName`)}/>
                                        )}
                                    </FormItem>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('phoneField', {
                                            initialValue: contactPhone,
                                            rules: [{ required: true,
                                                message: translate(`personal.form.errors.input.phone`)
                                            }],
                                        })(
                                            <InputNew width ="100%" bubbleplaceholder={translate(`personal.form.input.phone`)}/>
                                        )}
                                    </FormItem>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('emailField', {
                                            initialValue: contactEmail,
                                            rules:
                                                [{
                                                    required: true,
                                                    message: translate(`personal.form.errors.input.email.required`)
                                                },
                                                {
                                                    type: "email",
                                                    message: translate(`personal.form.errors.input.email.wrongFormat`)
                                                }],
                                        })(
                                            <InputNew width ="100%" bubbleplaceholder={translate(`personal.form.input.email`)}/>
                                        )}
                                    </FormItem>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('addressField', {
                                            initialValue: contactAddress,
                                            rules: [{ required: true,
                                                message: translate(`personal.form.errors.input.address`)
                                            }],
                                        })(
                                            <InputNew width ="100%" bubbleplaceholder={translate(`personal.form.input.address`)}/>
                                        )}
                                    </FormItem>

                                </div>
                            </div>

                            <Button
                                className="patient-contacts-saveBtn"
                                onClick={e => this.handleSubmitInfo(e, translate)}
                                btnText={translate(`button.title.saveChanges`)}
                                size='default'
                                disable={this.state.loadingInfo}
                                type='float'
                                style={{marginRight: "20px"}}
                            />

                            {this.state.loadingInfo && <Spinner isInline={true} size="small" />}


                            <div className='patient-contacts-title'>{translate(`personal.changePassword`)}</div>
                            <div className='patient-contacts-block'>
                                <div className='patient-contacts-password'>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('oldPassField', {
                                            rules: [{ required: this.state.passwordsRequired,
                                                message: translate(`personal.form.errors.input.password.required`)
                                            }],
                                        })(
                                            <InputNew type="password" width ="100%" bubbleplaceholder={translate(`personal.form.input.password.old`)} onChange={this.handleChange}/>
                                        )}
                                    </FormItem>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('newPassField', {
                                            rules: [{ required: this.state.passwordsRequired,
                                                message: translate(`personal.form.errors.input.password.required`)
                                            }],
                                        })(
                                            <InputNew type="password" width ="100%" bubbleplaceholder={translate(`personal.form.input.password.new`)} onChange={this.handleChange}/>
                                        )}
                                    </FormItem>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('repeatPassField', {
                                            rules: [{ required: this.state.passwordsRequired,
                                                message: translate(`personal.form.errors.input.password.required`)
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            }],
                                        })(
                                            <InputNew type="password" width ="100%" bubbleplaceholder={translate(`personal.form.input.password.repeat`)} onChange={this.handleChange}/>
                                        )}
                                    </FormItem>


                                </div>
                            </div>

                            <Button
                                btnText={translate(`button.title.saveChanges`)}
                                onClick={e => this.handleSubmitPassword(e, translate)}
                                size='default'
                                type='float'
                                style={{marginRight: "20px"}}
                            />
                            {this.state.loadingPass && <Spinner isInline={true} size="small" />}
                        </div>)
                    }
                </Translate>
            </Form>
        )
    }
}

PatientAccardionContactItemForm.propTypes = {
    contactFio: PropTypes.string,
    contactPhone: PropTypes.string,
    contactEmail: PropTypes.string,
    contactAdress: PropTypes.string,
    contactAvatar: PropTypes.string
};

PatientAccardionContactItemForm.defaultProps = {
    contactFio: '',
    contactPhone: '',
    contactEmail: '',
    contactAdress: '',
    contactAvatar: ''
};

const PatientAccardionContactItem  = Form.create()(PatientAccardionContactItemForm);

export default PatientAccardionContactItem
