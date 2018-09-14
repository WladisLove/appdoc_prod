import React from 'react';
import PropTypes from 'prop-types'
import { Form, Upload, Icon, message } from 'antd';
import Radio from '../RadioBox'
import DatePicker from '../DatePicker'
import Button from '../Button'
import InputWithTT from "../InputWithTT";
import InputDateWithToolTip from "../InputDateWithTT";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class Step1Form extends React.Component{
    state = {
        fileList: [],
        avatarUrl: "",
        avatarThumb: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            // if (!err) {
            //
            //     let fields = {
            //         ...values,
            //         avatarThumb: this.state.avatarThumb ? this.state.avatarThumb : this.props.data.avatarThumb
            //     };
            //     if(!values.avatar.url && !values.avatar.name) {
            //         fields.avatar = {name: this.state.avatarName, url: this.state.avatarUrl};
            //     }
                this.props.onSubmit(values);
                this.props.onNext();
            // }
        })
    };

    handleChange = (info) => {
        const reader = new FileReader();
        this.setState({ loading: true });
        this.props.uploadFile(info.file)
            .then((res) => {
                this.setState({avatarUrl: res.data.file[0].url, avatarName: res.data.file[0].name});
                message.success("Фото загружено")
            });
        reader.addEventListener('load', () => this.setState({
            avatarThumb: reader.result,
            loading: false
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
        console.log(this.state, "STATE");
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Загрузить</div>
            </div>
        );
        const avatarUrl = this.state.avatarThumb ? this.state.avatarThumb : this.props.data.avatarThumb ? this.props.data.avatarThumb : "";
        return (
            <Form onSubmit={this.handleSubmit} className="step-form step-1">
                <div className="step-title">Личные данные</div>
                <div className="step-note">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
                    eligendi harum hic itaque iusto neque porro recusandae. Accusamus corporis culpa est facere, in
                    pariatur porro reprehenderit similique sit tempora? Nisi!
                </div>
                <div className="step-form-row">
                    <FormItem>
                        {getFieldDecorator('fio1', {
                            rules: [{
                                required: true,
                                message: 'Введите ФИО, пожалуйста'
                            }],
                        })(
                            <InputWithTT
                                bubbleplaceholder="* ФИО"
                                className="step-form-item"
                                tooltip="ФИО Tooltip"

                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('fio2', {
                            rules: [{
                                required: true,
                                message: 'Введите ФИО, пожалуйста'
                            }],
                        })(
                            <InputDateWithToolTip
                                bubbleplaceholder="Дата рождения"
                                className="step-form-item"
                                tooltip="ДР Tooltip"


                            />
                        )}
                    </FormItem>
                </div>

                {/*<FormItem>
                    {getFieldDecorator('email', {
                        rules:
                            [
                                {type: 'email', message: 'Неправильный формат e-mail адреса'},
                                {required: true, message: "Введите ваш e-mail, пожалуйста"},
                                {validator: this.checkEmail}
                            ]
                    })(
                        <InputNew width="100%" bubbleplaceholder="* E-mail" className="step-form-item"/>
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
                                >
                                    {avatarUrl ? <img src={avatarUrl} alt="avatar" className="avatar-image"/> : uploadButton}
                                </Upload>
                            )}
                    </FormItem>*/}

                <div className="steps-action">
                    <Button htmlType="submit"
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
    checkEmailAvailability: PropTypes.func
};

Step1.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    onSubmit: () => {},
    checkEmailAvailability: () => {}
};

export default Step1
