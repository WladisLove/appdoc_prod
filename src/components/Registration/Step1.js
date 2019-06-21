import React from 'react';
import PropTypes from 'prop-types'
import {Form, Upload, Icon, message} from 'antd';
import InputNew from '../InputNew'
import Radio from '../RadioBox'
import DatePicker from '../DatePicker'
import Button from '../Button'
import {Translate} from "react-localize-redux";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class Step1Form extends React.Component {
    state = {
        fileList: [],
        avatarUrl: "",
        avatarThumb: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                let fields = {
                    ...values,
                    avatarThumb: this.state.avatarThumb ? this.state.avatarThumb : this.props.data.avatarThumb
                };
                if (!values.avatar.url && !values.avatar.name) {
                    fields.avatar = {name: this.state.avatarName, url: this.state.avatarUrl};
                }
                this.props.onSubmit(fields);
                this.props.onNext();
            }
        })
    };

    handleChange = (info, translate) => {
        const reader = new FileReader();
        this.setState({loading: true});
        this.props.uploadFile(info.file)
            .then((res) => {
                this.setState({avatarUrl: res.data.file[0].url, avatarName: res.data.file[0].name});
                message.success(translate("auth.messages.photoUploaded"))
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
                        res.data.email && res.data.login ? callBack() : callBack(<Translate id={"auth.errors.emailTaken"}/>)
                });
        }
        else callBack();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text"><Translate id={"button.title.upload"}/></div>
            </div>
        );
        const avatarUrl = this.state.avatarThumb ? this.state.avatarThumb : this.props.data.avatarThumb ? this.props.data.avatarThumb : "";
        return (
            <Translate>
                {({ translate, activeLanguage = {} }) =>
                    (
                        <Form onSubmit={this.handleSubmit} className="step-form">
                            <div className="step-posttitle">{translate("auth.inputContactInfo")}</div>
                            <div className="step-notification">{translate("auth.requiredFields")}</div>
                            <FormItem>
                                {getFieldDecorator('fio', {
                                    rules: [{
                                        required: true,
                                        message: translate("auth.errors.inputName")
                                    }, {
                                        pattern: activeLanguage.code === 'en' ? /^([A-Za-z-]+\s){1}[A-Za-z-]+\s*$/ : /^([А-ЯЁа-яё-]+\s){2}[А-ЯЁа-яё]+\s*$/,
                                        message: translate("auth.errors.wrongNameFormat")
                                    }],
                                })(
                                    <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.fullName")}`} className="step-form-item"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules:
                                        [
                                            {type: 'email', message: translate("auth.errors.wrongEmailFormat")},
                                            {required: true, message: translate("auth.errors.inputEmail")},
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
                                            message: translate("auth.errors.inputPhone")
                                        }, {
                                            pattern: /^[+]?[0-9()\- ]+$/,
                                            message: translate("auth.errors.wrongPhoneFormat")
                                        }]
                                })
                                (
                                    <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.phone")}`} className="step-form-item"/>
                                )}
                            </FormItem>
                            <div className="step-row">
                                <FormItem>
                                    <div className='radio-label'>{`* ${translate("auth.gender")}`}
                                        {getFieldDecorator('sex', {
                                            rules: [{
                                                required: true,
                                                message: translate("auth.errors.inputGender")
                                            }],
                                        })(
                                            <RadioGroup>
                                                <Radio value='w'>{translate("auth.female")}</Radio>
                                                <Radio value='m'>{translate("auth.male")}</Radio>
                                            </RadioGroup>
                                        )}
                                    </div>
                                </FormItem>
                                <FormItem>
                                    <div className='radio-label'>{`* ${translate("auth.birthday")}`}
                                        {getFieldDecorator('datebirth', {
                                            rules: [{
                                                required: true,
                                                message: translate("auth.errors.inputBirthday")
                                            }],
                                        })(
                                            <DatePicker placeholder={translate("auth.birthdayFormat")}/>
                                        )}
                                    </div>
                                </FormItem>
                            </div>
                            <FormItem className="avatar-doctor-uploader">
                                <div>{translate("auth.photo")}</div>

                                {getFieldDecorator('avatar', {
                                    rules: [{
                                        required: true,
                                        message: translate("auth.errors.uploadPhoto")
                                    }]
                                })
                                (
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={e => this.handleChange(e, translate)}
                                    >
                                        {avatarUrl ?
                                            <img src={avatarUrl} alt="avatar" className="avatar-image"/> : uploadButton}
                                    </Upload>
                                )}
                            </FormItem>

                            <div className="steps-action">
                                <Button htmlType="submit"
                                        btnText={translate("button.title.next")}
                                        size='large'
                                        type='gradient'/>

                            </div>
                        </Form>
                    )
                }
            </Translate>
        )
    }
}

const Step1 = Form.create({
    mapPropsToFields(props) {
        let fields = {};
        for (let key in props.data) {
            if (key !== 'current') {
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
    onSubmit: () => {
    },
    checkEmailAvailability: () => {
    }
};

export default Step1
