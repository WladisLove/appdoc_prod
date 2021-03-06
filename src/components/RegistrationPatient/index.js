import React from 'react';
import PropTypes from 'prop-types'
import { Form, Upload, Icon } from 'antd';
import TextArea from '../TextArea'
import Spinner from '../Spinner'
import Radio from '../RadioBox'
import TermsModal from '../TermsModal'
import DatePicker from '../DatePicker'
import Button from '../Button'
import moment from 'moment'
import './style.css'
import '../../icon/style.css'
import Checkbox from "../Checkbox";
import RegistrationComplete from "../RegistrationComplete";
import InputNew from "../InputNew";
import { Translate } from "react-localize-redux";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class RegistrationPatientForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            termsVisible: false,
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
                        res.data.email && res.data.login ? callBack() : callBack(<Translate id={"auth.errors.emailTaken"} />)
                });
        }
        else callBack();
    };
    handleCheckBoxClick = (e) => {
        this.setState({ checked: e.target.checked })

    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {

                let avatar = values.avatar
                    ? { name: values.avatar.file.name, thumbUrl: values.avatar.file.thumbUrl } : undefined;
                let response = {
                    ...values,
                    avatar: avatar,
                    datebirth: moment(values.date).format("X")
                };
                console.log(response);
                this.props.onFinish(response);
            }
        });
    };
    handleSubmitAgreement = (e) => {
        e.preventDefault();
        this.setState({ termsVisible: true })
    }

    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        window.ymaps && window.ymaps.ready(function () {
            const suggest = new window.ymaps.SuggestView('address');
            suggest.events.add("select", event => {
                setFieldsValue({
                    address: event.get("item").value,
                })
            });
            console.log(suggest);
        })

    }

    validateAge = (rule, value, callback) => {
        console.log('asd');
        const now = moment();
        if (now.diff(value, "years", true) < 18) {
            callback(<Translate id="personal.form.errors.input.date.underEighteen" />);
        } else {
            callback();
        }
    };

    getAppointmentMessage = () => {
        if(window.localStorage.getItem("tempAssigment")) {
            const timestamp = +JSON.parse(window.localStorage.getItem("tempAssigment")).timestamp;
            console.log(timestamp, moment().format("X"));
            if(timestamp > moment().format("X")) {
                return  <Translate>
                    {({translate}) =>
                        (
                            <div style={{
                                marginBottom: "20px",
                                fontWeight: 700,
                                color: "green"
                            }}>
                                {`${translate('auth.preAppFirst')} ${moment(timestamp*1000).format("DD MMM H:mm")} ${translate('auth.preAppSecond')}`}
                            </div>
                        )
                    }
                </Translate>
            } else {
                window.localStorage.setItem("tempAssigment", "")
            }

        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Загрузить</div>
            </div>
        );
        const avatarUrl = this.state.avatarUrl;
        if (this.props.isRegFinished) {
            return (
                <RegistrationComplete onOk={this.props.onOk} urlLogin={this.props.urlLogin} phone={"+375777777777"}
                    isPatientReg={true} />
            )
        }

        return (
            <Translate>
                {({ translate, activeLanguage = {} }) => {
                    const { code } = activeLanguage;
                    return (
                        <div className="registration-patient-form">
                            <div className="registration-title">{translate("auth.registration")}</div>
                            {this.getAppointmentMessage()}
                            <Form onSubmit={this.handleSubmit} className="step-patient-form">
                                <div className="step-notification">{translate("auth.requiredFields")}</div>

                                <FormItem>
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.inputName")
                                        }, {
                                            pattern: code === 'en' ? /^([A-Za-z-]+\s){1}[A-Za-z-]+\s*$/ : /^([А-ЯЁа-яё-]+\s){2}[А-ЯЁа-яё]+\s*$/,
                                            message: translate("auth.errors.wrongNameFormat")
                                        }],
                                    })(
                                        <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.fullName")}`} className="step-form-item" />
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
                                        <InputNew width="100%" bubbleplaceholder="* E-mail" className="step-form-item" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            {
                                                required: true,
                                                message: translate("auth.errors.wrongPhoneFormat"),
                                            },
                                            {
                                                pattern: /^[+]?[0-9()\- ]+$/,
                                                message: translate("auth.errors.wrongPhoneFormat"),
                                            }
                                        ]

                                    })(
                                        <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.phone")}`}
                                            className="step-form-item" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('address', {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.inputAddress"),
                                        }]

                                    })(
                                        <InputNew
                                            width="100%"
                                            bubbleplaceholder={`* ${translate("auth.address")}`}
                                            className="step-form-item"
                                        />
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
                                            {getFieldDecorator('date', {
                                                rules: [{
                                                    required: true,
                                                    message: translate("auth.errors.inputBirthday")
                                                },
                                                {
                                                    validator: this.validateAge,
                                                }],
                                            })(
                                                <DatePicker placeholder={translate("auth.birthdayFormat")} />
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
                                                className="avatar-image" /> : uploadButton}
                                        </Upload>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('termsOfUse', {
                                        valuePropName: 'checked',
                                        initialValue: false,
                                    })(
                                        <Checkbox onChange={this.handleCheckBoxClick}>
                                            {translate("auth.termsAndConditions1")}
                                            <a onClick={this.handleSubmitAgreement} >{translate("auth.termsAndConditions2")}</a>
                                            {translate("auth.termsAndConditions3")}
                                        </Checkbox>
                                    )}
                                </FormItem>

                                <div className="steps-action">
                                    <Button htmlType="submit"
                                        btnText={translate("button.title.register")}
                                        size='large'
                                        disable={!this.state.checked || this.props.isRegInProgress}
                                        type='gradient'
                                        style={{ margin: 0 }} />
                                </div>
                                {this.props.isRegInProgress &&
                                    <div style={{ marginTop: "15px" }}>
                                        <Spinner size="large">

                                        </Spinner>
                                    </div>}

                            </Form>
                            <TermsModal
                                visible={this.state.termsVisible}
                                onCancel={() => this.setState({ termsVisible: false })}


                            />

                        </div>

                    )
                }
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
