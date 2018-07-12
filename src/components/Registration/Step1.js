import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import { Form } from 'antd';
import Input from '../Input'
import Radio from '../RadioBox'
import DatePicker from '../DatePicker'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Step1Form extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
                this.props.onNext();
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {fio,
            email,
            phone,
            sex,
            datebirth} = this.props.form.getFieldsValue();

        return (
            <Form onSubmit={this.handleSubmit} className="step-form">
                <div className="step-posttitle">Заполните основные контактные данные</div>
                <div className="step-notification">* Поля, обязательные для заполнения</div>
                <FormItem>
                    {getFieldDecorator('fio', {
                        rules: [{ required: true,
                            message: 'Введите ФИО, пожалуйста' }],
                    })(
                        <Input addonBefore='* ФИО'
                               className='step-form-item'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'Неправильный формат e-mail адреса',
                        },{ required: true,
                            message: 'Введите ваш e-mail, пожалуйста' }],
                    })(
                        <Input addonBefore='* E-mail'
                               className='step-form-item'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true,
                            message: 'Неправильный формат номера телефона',
                            pattern: /^[+]?[0-9()\- ]+$/ }]

                        })(
                        <Input addonBefore='* Телефон'
                               className='step-form-item'/>
                    )}
                </FormItem>
                <div className="step-row">
                    <FormItem>
                        <div className='radio-label'>* Пол
                            {getFieldDecorator('sex', {
                                rules: [{ required: true,
                                    message: 'Выберите пол, пожалуйста' }],
                            })(
                                <RadioGroup>
                                    <Radio value='w'>Жен.</Radio>
                                    <Radio value='m'>Муж.</Radio>
                                </RadioGroup>
                            )}
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className='radio-label'>* Дата рождения
                            {getFieldDecorator('datebirth', {
                                rules: [{ required: true,
                                    message: 'Введите дату вашего рождения, пожалуйста' }],
                            })(
                                <DatePicker placeholder="дд/мм/гггг"/>
                            )}
                        </div>
                    </FormItem>
                </div>
                <div className="steps-action">
                    <Button htmlType="submit"
                            disable={!(fio&&
                                email &&
                                phone &&
                                sex &&
                                datebirth)}
                            btnText='Далее'
                            size='large'
                            type='gradient'/>
                </div>
            </Form>
        )
    }
}

const Step1 = Form.create({
    mapPropsToFields(props) {
        let fields ={};
        for (let key in props.data){
            if (key !== 'current'){
                fields[key] = Form.createFormField({
                    value: props.data[key],
                })
            }
        }
        return fields;
    },
})(Step1Form);


Step1.propTypes = {
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onSubmit: PropTypes.func,
};

Step1.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    onSubmit: () => {},
};

export default Step1
