import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import {Form, message} from 'antd'
import Button from '../Button'
import Input from '../Input'
import Rate from '../Rate'
import Icon from '../Icon'
import Popover from '../Popover'
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'
import PersonalEducation from "../PersonalEducation";
import ProfileAvatar from "../ProfileAvatar";
import InputNew from "../InputNew";
import Spinner from "../Spinner";

const FormItem = Form.Item;

class PersonalContactItemForm extends React.Component{
    constructor() {
        super();
        this.state  = {
            avatar: ''
        }
    }

    handleSubmitInfo = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.setState({loadingInfo:true});
                if(this.state.avatar) {
                    values.avatar = {...this.state.avatar}
                }
                this.props.onSubmit(values)
                    // .then((res) => {
                    //     this.setState({loadingInfo: false});
                    //     if (res.data.code === 200) {
                    //         message.success("Изменения сохранены")
                    //     } else {
                    //         message.error("Произошла ошибка, попробуйте ещё раз")
                    //     }
                    // })
            } else {
                console.log(err);
            }
        });
    };

    handleSubmitPassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loadingPass:true});

                this.props.onSubmitPassword(values.oldPassField, values.newPassField)
                    .then((res) => {
                        this.setState({loadingPass: false});
                        if (res.data.code === 200) {
                            message.success(<Translate id="notifications.saved"/>);
                            this.props.form.resetFields();
                        } else if(res.data.code===601){
                            message.error(<Translate id="personal.form.errors.input.password.wrongOldPassword"/>)
                        }
                        else{
                            message.error(<Translate id="personal.form.errors.input.password.tryAgain"/>)
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
        const { fio, phone, email, oldPassword, newPassword, avatar} = this.props.profileDoctor;
        const rootClass = cn('personal-contact');

        return (
            <Form className={rootClass}>
                <Translate>
                    {({ translate }) =>
                        (<div>
                            <div className='patient-contacts-title'>{translate(`personal.contacts`)}</div>
                            <div className='patient-contacts-block'>
                                <div className='patient-contacts-avatar'>
                                    <ProfileAvatar
                                        img={this.state.avatar.thumbUrl ? this.state.avatar.thumbUrl : avatar}
                                        owner='patient'
                                        size="large"
                                        online={true}
                                    />
                                    <div className='patient-contacts-controls'>
                                        <div className="file-upload">
                                            <label className="file-upload-label">
                                                <Icon type='retweet' size={16}/>
                                            </label>
                                            <input className="file-upload-input" type="file" name="photo-upload" onChange={this.handleChangeAvatar} />
                                        </div>
                                    </div>

                                </div>

                                <div className='patient-contacts-info'>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('fio', {
                                            initialValue: fio,
                                            rules: [{ required: true,
                                                message: translate(`personal.form.errors.input.fullName`)
                                            }],
                                        })(
                                            <InputNew width ="100%" bubbleplaceholder={translate(`personal.form.input.fullName`)} />
                                        )}
                                    </FormItem>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('phone', {
                                            initialValue: phone,
                                            rules: [{ required: true,
                                                message: translate(`personal.form.errors.input.phone`)
                                            }],
                                        })(
                                            <InputNew width ="100%" bubbleplaceholder={translate(`personal.form.input.phone`)} />
                                        )}
                                    </FormItem>
                                    <FormItem className="input-form-item">
                                        {getFieldDecorator('email', {
                                            initialValue: email,
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
                                            <InputNew width="100%" bubbleplaceholder={translate(`personal.form.input.email`)} />
                                        )}
                                    </FormItem>
                                </div>
                            </div>

                            <Button
                                className="patient-contacts-saveBtn"
                                onClick={this.handleSubmitInfo}
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
                                onClick={this.handleSubmitPassword}
                                size='default'
                                type='float'
                                style={{marginRight: "20px"}}
                            />
                        </div>)
                    }
                </Translate>

                {this.state.loadingPass && <Spinner isInline={true} size="small" />}

            </Form>
        )
    }
}

const PersonalContactItem  = Form.create()(PersonalContactItemForm);

PersonalContactItem.propTypes = {
    profileDoctor: PropTypes.object
};

PersonalContactItem.defaultProps = {
    profileDoctor: {}
};

export default PersonalContactItem
