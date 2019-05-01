import React from 'react';
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { Form } from 'antd';
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Input from '../Input'
import { Translate } from 'react-localize-redux'
import LanguageToggle from '../LanguageToggle';

import './style.css'
import '../../icon/style.css'

const FormItem = Form.Item;

class LoginForm extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    render(){
        const {errorCode, urlForget, urlRegistrationDoctor, urlRegistrationPatient} = this.props;

        const { getFieldDecorator } = this.props.form;

        let error = [];

        switch(errorCode){
            case 400:
                error = [{
                    validateStatus: 'error',
                    help: <Translate id="auth.errors.wrongLoginOrPassword"/>
                },{
                    validateStatus: 'error',
                }];
                break;
            case 500:
                error = [{
                    validateStatus: 'error',
                    help: <Translate id="auth.errors.userDoesNotExist"/>
                },{
                    validateStatus: 'error',
                }];
                break;
            case 200:
            default:
                error = [];
        }

        return (<div>
            <Translate>
                {({ translate }) => (
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="login-title">{translate('auth.title')}</div>
                        <div className="login-notification">{translate('auth.requiredFields')}</div>
                        <FormItem {...error[0]}>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: translate('auth.errors.inputEmail')}],
                            })(
                                <Input placeholder={translate("auth.emailOrLogin")}
                                        className='login-form-item'/>
                            )}
                        </FormItem>
                        <FormItem {...error[1]}>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: translate('auth.errors.inputPassword')}],
                            })(
                                <Input placeholder={translate("auth.password")}
                                      addonAfter={<NavLink className="login-form-navlink" to={urlForget}>{translate('auth.forgotPassword')}</NavLink>}
                                      type="password"
                                      className='login-form-item'/>
                            )}
                        </FormItem>

                        <LanguageToggle />

                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: false,
                            })(
                                <Checkbox>{translate('auth.rememberMe')}</Checkbox>
                            )}
                        </FormItem>

                        <div className="login-form-control">
                            <Button htmlType="submit"
                                    btnText={translate('button.title.signIn')}
                                    size='large'
                                    type='gradient'/>

                            <div>{translate('auth.noAccountYet')}<br/>
                                <NavLink
                                    to={urlRegistrationDoctor}
                                    className="login-form-navlink"
                                    data-tip
                                >
                                    {translate('auth.registerAsDoctor')}
                                </NavLink>
                                    <ReactTooltip place="top" type="dark" effect="float" multiline={true}>
                                        {translate('auth.docRegistrationTooltip')}
                                    </ReactTooltip>

                                    <br/>

                                <NavLink
                                    to={urlRegistrationPatient}
                                    className="login-form-navlink"
                                >
                                    {translate('auth.registerAsPatient')}
                                </NavLink>
                            </div>
                        </div>
                    </Form>
                )}
            </Translate>
        </div>)
    }
}

const Login = Form.create()(LoginForm);

Login.propTypes = {
    errorCode: PropTypes.oneOf([0,200, 400, 500]),
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onSubmit: PropTypes.func,
};

Login.defaultProps = {
    errorCode: 0,
    urlForget: '',
    urlRegistration: '',
    onSubmit: () => {},
};

export default Login;
