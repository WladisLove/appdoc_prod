import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Form } from 'antd'
import Button from '../Button'
import Input from '../Input'
import Rate from '../Rate'
import Icon from '../Icon'
import Popover from '../Popover'


import './style.css'
import '../../icon/style.css'
import PersonalEducation from "../PersonalEducation";

const FormItem = Form.Item;

class PersonalContactItemForm extends React.Component{


    onSave = (values) => {
        let pr = this.props.profileDoctor;
        pr.fio = values.fioField;

        pr.phone = values.phoneField;
        pr.email = values.emailField;
        pr.newPassword = values.newPasswordField;
        pr.oldPassword = values.oldPasswordField;
        return pr;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newProfile = this.onSave(values);
                this.props.form.resetFields();
                this.props.onSubmit(newProfile);
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const { fio, phone, email, oldPassword, newPassword} = this.props.profileDoctor;
        const rootClass = cn('personal-contact');
      
        return (
            <Form className={rootClass} onSubmit={this.handleSubmit} >
                <div className="personal-block">
                    <div className="personal-item">
                        <div className="personal-title">контактные данные</div>
                    </div>
                    <FormItem className="personal-item">
                        {getFieldDecorator('fioField', {
                            initialValue: fio,
                            rules: [{ required: true,
                                    message: 'Введите ФИО, пожалуйста'
                                }],
                        })(
                            <Input addonBefore="ФИО"/>
                        )}

                    </FormItem>
                    <FormItem className="personal-item">
                        {getFieldDecorator('phoneField', {
                            initialValue: phone,
                            rules: [{ required: true,
                                message: 'Введите телефон, пожалуйста',
                                pattern: /^[+]?[0-9()\- ]+$/
                            }],
                        })(
                            <Input addonBefore="Телефона" />
                        )}
                    </FormItem>
                    <FormItem className="personal-item">
                        {getFieldDecorator('emailField', {
                            initialValue: email,
                            rules: [{
                                type: 'email', message: 'Неправильный формат e-mail адреса',
                            },{ required: true,
                                message: 'Введите e-mail, пожалуйста'
                            }],
                        })(
                            <Input addonBefore="Email" />
                        )}
                    </FormItem>
                </div>

                <div className="personal-block">
                    <div className="personal-item">
                        <div className="personal-title">изменить пароль</div>
                    </div>
                    <FormItem className="personal-item">
                        {getFieldDecorator('oldPasswordField', {
                            initialValue: oldPassword,
                            rules: [{ required: true,
                                message: 'Введите текущий пароль, пожалуйста'
                            }],
                        })(
                            <Input addonBefore="Текущий пароль" type="password"/>
                        )}
                    </FormItem>
                    <FormItem className="personal-item">
                        {getFieldDecorator('newPasswordField', {
                            initialValue: newPassword,
                            rules: [{
                                message: 'Введите новый пароль, пожалуйста'
                            }],required: true,
                        })(
                            <Input addonBefore="Новый пароль" />
                        )}
                    </FormItem>
                </div>


                <Button htmlType="submit"
                        btnText='Сохранить изменения'
                        size='default'
                        type='float' />

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