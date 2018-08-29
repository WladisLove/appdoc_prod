import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

import { Form, Upload, Icon, message } from 'antd';
import Input from '../Input'
import InputNew from '../InputNew'
import Radio from '../RadioBox'
import DatePicker from '../DatePicker'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'
import Spinner from "../Spinner";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class Step1Form extends React.Component{
    state = {
        fileList: [],
        avatarUrl: "",
        loadingSpinner: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loadingSpinner: true});
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let fields = {
                    ...values,
                    avatarUrl: this.state.avatarUrl ? this.state.avatarUrl : this.props.data.avatarUrl
                };
                values.avatar ? values.avatar.fileList[0].thumbUrl = this.state.avatarUrl ? this.state.avatarUrl: null : null;
                this.props.onSubmit(fields);
                this.props.onNext();
                this.setState({loadingSpinner: false})
            } else {
                this.setState({loadingSpinner: false})

            }
        });
    };

    handleChange = (info) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({
            avatarUrl: reader.result,
            fileList: [info.file]
        }));
        reader.readAsDataURL(info.file);
    };

    checkEmail = (role, email, callBack) => {
        if (email) {
            this.props.checkEmailAvailability(email)
                .then((res) => {
                    if (res && res.status === 200)
                        res.data.email && res.data.login ? callBack() : callBack("Данный email уже занят")
                });
        }
        else callBack();
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Загрузить</div>
            </div>
        );
        const avatarUrl = this.state.avatarUrl ? this.state.avatarUrl : this.props.data.avatarUrl ? this.props.data.avatarUrl : "";
        return (
            <Form onSubmit={this.handleSubmit} className="step-form">
                <div className="step-posttitle">Заполните основные контактные данные</div>
                <div className="step-notification">* Поля, обязательные для заполнения</div>
                <FormItem>
                    {getFieldDecorator('fio', {
                        rules: [{
                            required: true,
                            message: 'Введите ФИО, пожалуйста'
                        }],
                    })(
                        <InputNew width ="100%" bubbleplaceholder="* ФИО" className="step-form-item"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [
                            {type: 'email', message: 'Неправильный формат e-mail адреса'},
                            {required: true, message: "Введите ваш e-mail, пожалуйста"},
                            {validator: this.checkEmail}],
                    })(
                        <InputNew width ="100%" bubbleplaceholder="* E-mail" className="step-form-item"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('phone', {
                        rules:
                            [{
                                required: true,
                                message: 'Введите телефон, пожалуйста'
                            },{
                                pattern: /^[+]?[0-9()\- ]+$/,
                                message: 'Неправильный формат номера телефона'
                            }]})
                    (
                        <InputNew width ="100%" bubbleplaceholder="* Телефон" className="step-form-item"/>
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
                                    message: 'Введите дату, пожалуйста' }],
                            })(
                                <DatePicker placeholder="дд/мм/гггг"/>
                            )}
                        </div>
                    </FormItem>
                </div>
                <div className="step-row">
                    <FormItem className="avatar-doctor-uploader">
                        <div >* Фото</div>

                            {getFieldDecorator('avatar', {
                                rules: [{
                                    required: true,
                                    message: 'Загрузите фото, пожалуйста'
                                }]})
                            (
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload = {()=>false}
                                    onChange={this.handleChange}
                                    fileList = {this.props.data.avatar ? [this.props.data.avatar.file] : []}
                                >
                                    {avatarUrl ? <img src={avatarUrl} alt="avatar" className="avatar-image"/> : uploadButton}
                                </Upload>
                            )}
                    </FormItem>
                </div>

                <div className="steps-action">
                    <Button htmlType="submit"
                            disable={this.state.loadingSpinner}
                            btnText='Далее'
                            size='large'
                            type='gradient'/>

                </div>
                {this.state.loadingSpinner &&  <Spinner/>}
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
    checkEmailAvailability: PropTypes.func
};

Step1.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    onSubmit: () => {},
    checkEmailAvailability: () => {}
};

export default Step1
