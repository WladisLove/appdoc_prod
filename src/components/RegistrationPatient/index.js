import React from 'react';
import PropTypes from 'prop-types'

import {Form, Upload, Icon, message, Alert} from 'antd';

import Input from '../Input'
import TextArea from '../TextArea'
import Spinner from '../Spinner'

import Radio from '../RadioBox'
import DatePicker from '../DatePicker'
import Button from '../Button'
import moment from 'moment'

import './style.css'
import '../../icon/style.css'
import {previewFile} from "../../helpers/modifyFiles";
import Checkbox from "../Checkbox";
import {NavLink} from "react-router-dom";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
class RegistrationPatientForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            isRegInProgress: false,
            shouldAgreeTOU: false
        };

    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }

        this.modifyFiles(info.file);

    };
    handleCheckBoxClick = (e) => {
        if(e.target.checked === true) {
            this.setState({shouldAgreeTOU: false})
        }

    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(!values.termsOfUse) {
                    this.setState({shouldAgreeTOU: true});
                    return;
                }
                let avatar = {name: values.avatar.file.name, thumbUrl: values.avatar.file.thumbUrl}
                let response = {
                    ...values,
                    avatar: {...avatar},
                    date: moment(values.date).format("X")
                };

                console.log(response);
               //this.props.onSubmit(values);
            }
        });
    };
    modifyFiles = (file) => {
        if(!file.thumbUrl && !file.modify){
            file.modify = true;
            previewFile(file.originFileObj, function (previewDataUrl) {
                file.thumbUrl = previewDataUrl;
            });
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {name,
            email,
            phone,
            sex,
            date} = this.props.form.getFieldsValue();
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Загрузить</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div className="registration-form">
                <div className="registration-title">Регистрация</div>
                <Form onSubmit={this.handleSubmit} className="step-form">
                    <div className="step-notification">* Поля, обязательные для заполнения</div>
                    <FormItem>
                        {getFieldDecorator('name', {
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
                    <FormItem>
                        {getFieldDecorator('adress', {
                            rules: [{
                                required: true,
                                message: 'Введите ваш адрес, пожалуйста'}]

                        })(
                            <Input addonBefore='* Адрес'
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
                                {getFieldDecorator('date', {
                                    rules: [{ required: true,
                                        message: 'Введите дату вашего рождения, пожалуйста' }],
                                })(
                                    <DatePicker placeholder="дд/мм/гггг"/>
                                )}
                            </div>
                        </FormItem>
                    </div>
                    <FormItem>
                        {getFieldDecorator('chronic')(
                            <TextArea placeholder="Астма, гастрит"
                                      autosize
                                      label="Хронические заболевания"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('allergy')(
                            <TextArea placeholder="На молоко, на воздух, на глицин"
                                      autosize
                                      label="Аллергии"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <div>Фото</div>
                        {getFieldDecorator('avatar')(
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('termsOfUse', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(
                            <Checkbox onChange={this.handleCheckBoxClick}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam dicta ducimus, id minus nostrum nulla possimus provident temporibus vitae voluptatem.</Checkbox>
                        )}
                        {this.state.shouldAgreeTOU && <Alert style={{marginTop:10}} message="Прочтите и примите условия соглашения, пожалуйста" type="error" >Выберете доступное время</Alert>}
                    </FormItem>

                    <div className="steps-action">
                        <Button htmlType="submit"
                                disable={!(name&&
                                    email &&
                                    phone &&
                                    sex &&
                                    date)}
                                btnText='Зарегистрироваться'
                                size='large'
                                type='gradient'
                                style={{margin:0}}/>
                    </div>
                    <div style={{marginTop: "15px", textAlign: "center"}}>У вас уже есть аккаунт? <NavLink to={this.props.urlLogin}
                                                                                                           className="login-form-navlink">Войти</NavLink>
                    </div>
                    {this.state.isRegInProgress &&
                    <div style={{marginTop: "15px"}}>
                        <Spinner size="large">

                        </Spinner>
                    </div>}

                </Form>
            </div>
        )
    }
}


RegistrationPatientForm.propTypes = {
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onFinish: PropTypes.func,
};

RegistrationPatientForm.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    onFinish: () => {},
};
const RegistrationPatient = Form.create()(RegistrationPatientForm);
export default RegistrationPatient
