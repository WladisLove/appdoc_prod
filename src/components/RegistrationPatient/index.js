import React from 'react';
import PropTypes from 'prop-types'
import {Form, Upload, Icon} from 'antd';
import TextArea from '../TextArea'
import Spinner from '../Spinner'
import Radio from '../RadioBox'
import DatePicker from '../DatePicker'
import Button from '../Button'
import moment from 'moment'
import './style.css'
import '../../icon/style.css'
import Checkbox from "../Checkbox";
import {NavLink} from "react-router-dom";
import RegistrationComplete from "../RegistrationComplete";
import InputNew from "../InputNew";
import {Translate} from "react-localize-redux";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class RegistrationPatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

    }

    handleChange = (info) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
                this.setState({
                    avatarUrl: reader.result,
                    fileList: [info.file]
                });
                info.file.thumbUrl = reader.result
            }
        );
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
    handleCheckBoxClick = (e) => {
        this.setState({checked: e.target.checked})

    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {

                let avatar = values.avatar
                    ? {name: values.avatar.file.name, thumbUrl: values.avatar.file.thumbUrl} : undefined;
                let response = {
                    ...values,
                    avatar: avatar,
                    date: moment(values.date).format("X")
                };
                console.log(response);
                this.props.onFinish(response);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Загрузить</div>
            </div>
        );
        const avatarUrl = this.state.avatarUrl;
        if (this.props.isRegFinished) {
            return (
                <RegistrationComplete onOk={this.props.onOk} urlLogin={this.props.urlLogin} phone={"+375777777777"}
                                      isPatientReg={true}/>
            )
        }
        return (
            <Translate>
                {({translate}) =>
                    (
                        <div className="registration-patient-form">
                            <div className="registration-title">{translate("auth.registration")}</div>
                            <Form onSubmit={this.handleSubmit} className="step-patient-form">
                                <div className="step-notification">{translate("auth.requiredFields")}</div>
                                <FormItem>
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.inputName")
                                        }],
                                    })(
                                        <InputNew width="100%" bubbleplaceholder={translate("auth.fullName")} className="step-form-item"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: translate("auth.errors.wrongEmailFormat")
                                            },
                                            {
                                                required: true,
                                                message: translate("auth.errors.inputEmail")
                                            },
                                            {
                                                validator: this.checkEmail
                                            }
                                            ],
                                    })(
                                        <InputNew width="100%" bubbleplaceholder="* E-mail" className="step-form-item"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('phone', {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.wrongPhoneFormat"),
                                            pattern: /^[+]?[0-9()\- ]+$/
                                        }]

                                    })(
                                        <InputNew width="100%" bubbleplaceholder={translate("auth.phone")}
                                                  className="step-form-item"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('adress', {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.inputAddress"),
                                        }]

                                    })(
                                        <InputNew width="100%" bubbleplaceholder={translate("auth.address")} className="step-form-item"/>
                                    )}
                                </FormItem>

                                <div className="step-row">
                                    <FormItem>
                                        <div className='radio-label'>{translate("auth.gender")}
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
                                        <div className='radio-label'>{translate("auth.birthday")}
                                            {getFieldDecorator('date', {
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
                                <FormItem>
                                    {getFieldDecorator('chronic')(
                                        <TextArea autosize
                                                  label={translate("auth.chronicDiseases")}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('allergy')(
                                        <TextArea autosize
                                                  label={translate("auth.allergies")}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <div>{translate("auth.photo")}</div>
                                    {getFieldDecorator('avatar')(
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={() => false}
                                            onChange={this.handleChange}
                                        >
                                            {avatarUrl ? <img src={avatarUrl} alt="avatar"
                                                              className="avatar-image"/> : uploadButton}
                                        </Upload>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('termsOfUse', {
                                        valuePropName: 'checked',
                                        initialValue: false,
                                    })(
                                        <Checkbox onChange={this.handleCheckBoxClick}>{translate("auth.termsAndConditions")}</Checkbox>
                                    )}
                                </FormItem>

                                <div className="steps-action">
                                    <Button htmlType="submit"
                                            btnText={translate("button.title.register")}
                                            size='large'
                                            disable={!this.state.checked || this.props.isRegInProgress}
                                            type='gradient'
                                            style={{margin: 0}}/>
                                </div>
                                {this.props.isRegInProgress &&
                                <div style={{marginTop: "15px"}}>
                                    <Spinner size="large">

                                    </Spinner>
                                </div>}

                            </Form>
                        </div>
                    )
                }
            </Translate>
        )
    }
}


RegistrationPatientForm.propTypes = {
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onFinish: PropTypes.func,
    checkEmailAvailability: PropTypes.func
};

RegistrationPatientForm.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    onFinish: () => {
    },
    checkEmailAvailability: () => {
    }
};
const RegistrationPatient = Form.create()(RegistrationPatientForm);
export default RegistrationPatient
