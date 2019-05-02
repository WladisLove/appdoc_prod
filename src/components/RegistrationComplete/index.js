import React from 'react';
import PropTypes from 'prop-types'
import {Translate} from "react-localize-redux";

import Button from '../Button'

import './style.css'
import '../../icon/style.css'
import {NavLink} from "react-router-dom";
import {Form} from "antd";


class RegistrationComplete extends React.Component{

    render() {
        const {text, phone} = this.props;
        return (
            <Translate>
                {({translate}) =>
                    (
                        <div className="registration-form">
                            <div className="registration-title">{translate("auth.thankYouWithUs")}</div>
                            <div className="loginforget-body">
                                {this.props.isPatientReg ?
                                    translate("auth.completeRegPatient") :
                                    translate("auth.completeRegDoc")}
                                <br/>
                                {text}
                            </div>
                            <div className="login-form-control">
                                <NavLink to={this.props.urlLogin}
                                         className="login-form-navlink">
                                    <Button
                                        onClick={this.props.onOk}
                                        htmlType="submit"
                                        btnText='Ок'
                                        size='large'
                                        type='gradient'/>
                                </NavLink>
                            </div>
                            <div className="login-forget-body">{translate("auth.haveQuestions")}</div>
                            <a href={`tel:${phone}`} className="login-form-navlink">{phone}</a>
                        </div>
                    )
                }
            </Translate>
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
