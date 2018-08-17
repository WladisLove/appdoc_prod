import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Form } from 'antd'

import ProfileAvatar from '../ProfileAvatar'
import Button from '../Button'
import Input from '../Input'

import './style.css'
import '../../icon/style.css'
const FormItem = Form.Item;

class PatientAccardionContactItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            passwordsRequired: false,
        }
    }

    handleSubmitInfo = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                // let newProfile = this.onSave(values);
                this.props.onSubmit(values);
            } else {
                console.log(err);
            }
        });
    };

    handleSubmitPassword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmitPassword(values.oldPassField, values.newPassField);
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

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassField')) {
            callback('Пароли не совпадают');
        } else {
            callback();
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const { contactFio, contactPhone, contactEmail, contactAddress} = this.props;
        const rootClass = cn('patient-contacts');
        
        return (
            <Form className={rootClass} >
                    <div className='patient-contacts-title'>контактные данные</div>
                    <div className='patient-contacts-block'>
                        <div className='patient-contacts-avatar'>
                            <ProfileAvatar
                                img='https://boltai.com/wp-content/uploads/2017/07/3_main_new.1494599956.jpg'
                                owner='patient'
                                size="large"
                                online={true}
                            />
                            <div className='patient-contacts-controls'>
                                <Button
                                    btnText=''
                                    size='icon'
                                    type='icon'
                                    icon='retweet'
                                    iconSize={16}
                                />
                                <Button
                                    btnText=''
                                    size='icon'
                                    type='icon'
                                    icon='close'
                                    iconSize={13}
                                />
                            </div>

                        </div>
                        <div className='patient-contacts-info'>
                            <FormItem className="input-form-item">
                                {getFieldDecorator('fioField', {
                                    initialValue: contactFio,
                                    rules: [{ required: true,
                                        message: 'Введите ФИО, пожалуйста'
                                    }],
                                })(
                                    <Input addonBefore='ФИО' />
                                )}
                            </FormItem>
                            <FormItem className="input-form-item">
                                {getFieldDecorator('phoneField', {
                                    initialValue: contactPhone,
                                    rules: [{ required: true,
                                        message: 'Введите телефон, пожалуйста'
                                    }],
                                })(
                                    <Input addonBefore='Телефон' />
                                )}
                            </FormItem>
                            <FormItem className="input-form-item">
                                {getFieldDecorator('emailField', {
                                    initialValue: contactEmail,
                                    rules:
                                        [{
                                            required: true,
                                            message: 'Введите email, пожалуйста'
                                        },
                                        {
                                            type: "email",
                                            message: 'Неправильный формат'
                                        }],
                                })(
                                    <Input addonBefore='E-mail' />
                                )}
                            </FormItem>
                            <FormItem className="input-form-item">
                                {getFieldDecorator('addressField', {
                                    initialValue: contactAddress,
                                    rules: [{ required: true,
                                        message: 'Введите адрес, пожалуйста'
                                    }],
                                })(
                                    <Input addonBefore='Адрес' />
                                )}
                            </FormItem>

                        </div>
                    </div>

                    <Button
                        className="patient-contacts-saveBtn"
                        onClick={this.handleSubmitInfo}
                        btnText='Сохранить изменения'
                        size='default'
                        type='float'
                    />


                    <div className='patient-contacts-title'>изменить пароль</div>
                    <div className='patient-contacts-block'>
                        <div className='patient-contacts-password'>
                            <FormItem className="input-form-item">
                                {getFieldDecorator('oldPassField', {
                                    rules: [{ required: this.state.passwordsRequired,
                                        message: 'Введите пароль, пожалуйста'
                                    }],
                                })(
                                    <Input type='password' addonBefore='Старый пароль'  onChange={this.handleChange}/>
                                )}
                            </FormItem>
                            <FormItem className="input-form-item">
                                {getFieldDecorator('newPassField', {
                                    rules: [{ required: this.state.passwordsRequired,
                                        message: 'Введите пароль, пожалуйста'
                                    }],
                                })(
                                    <Input type='password' addonBefore='Новый пароль' onChange={this.handleChange}/>
                                )}
                            </FormItem>
                            <FormItem className="input-form-item">
                                {getFieldDecorator('repeatPassField', {
                                    rules: [{ required: this.state.passwordsRequired,
                                        message: 'Введите пароль, пожалуйста'
                                    },
                                        {
                                            validator: this.compareToFirstPassword,
                                        }],
                                })(
                                    <Input type='password' addonBefore='Повторите пароль' onChange={this.handleChange}/>
                                )}
                            </FormItem>


                        </div>
                    </div>

                    <Button
                        btnText='Сохранить изменения'
                        onClick={this.handleSubmitPassword}
                        size='default'
                        type='float'
                    />
            </Form>
        )
    }
}

PatientAccardionContactItemForm.propTypes = {
    contactFio: PropTypes.string,
    contactPhone: PropTypes.string,
    contactEmail: PropTypes.string,
    contactAdress: PropTypes.string,
};

PatientAccardionContactItemForm.defaultProps = {
    contactFio: '',
    contactPhone: '',
    contactEmail: '',
    contactAdress: '',
};

const PatientAccardionContactItem  = Form.create()(PatientAccardionContactItemForm);

export default PatientAccardionContactItem