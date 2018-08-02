import React from 'react';
import PropTypes from 'prop-types'

import Button from '../Button'

import './style.css'
import '../../icon/style.css'
import {NavLink} from "react-router-dom";
import {Form} from "antd";


class RegistrationComplete extends React.Component{

    render(){
        const {text,phone} = this.props;
        return (
            <div className="registration-form">
                <div className="registration-title">Спасибо!</div>
                <div className="loginforget-body">
                    {this.props.isPatientReg ? "Регистрация завершена." : "Ваша заявка отправлена."} <br />
                    {text}
                </div>
                <div className="login-form-control">
                    <NavLink to={this.props.urlLogin}
                             className="login-form-navlink">
                        <Button
                            htmlType="submit"
                            btnText='Ок'
                            size='large'
                            type='gradient'/>
                    </NavLink>
                </div>
                <div className="login-forget-body">Остались вопросы?</div>
                <a href={`tel:${phone}`} className="login-form-navlink">{phone}</a>
            </div>
        )
    }
}

RegistrationComplete.propTypes = {
    text: PropTypes.string,
    phone: PropTypes.string,
    onSubmit: PropTypes.func,
};

RegistrationComplete.defaultProps = {
    text: '',
    phone: '',
    onSubmit: () => {},
};

export default RegistrationComplete
