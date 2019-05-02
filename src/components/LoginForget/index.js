import React from 'react';
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { Form } from 'antd';
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import Input from '../Input'


import './style.css'
import '../../icon/style.css'
import {Translate} from "react-localize-redux";

const FormItem = Form.Item;

function validatePhone(number='') {
    let rez = number.match(/\d/g);

    if(rez){
        if (rez.length === 11 || rez.length === 12) {
            return true;
        }
    }
    return false;
}


class LoginForgetForm extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    goBackHandler = (e) => {
        e.preventDefault();
        this.props.onUrlChange()
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {phone} = this.props.form.getFieldsValue();
        const link = this.props.onUrlChange ?
            (<span onClick={this.goBackHandler}
                   className="loginforget-backlink"><Translate id={"auth.title"}/></span>)
            :
            (<NavLink to={this.props.urlLogin}
                      className="login-form-navlink"><Translate id={"auth.title"}/></NavLink>);

        return (
            <Translate>
                {({translate}) =>
                    (
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className="login-title">{translate("auth.forgotPassword")}</div>
                            <div className="loginforget-body">
                                {translate("auth.weWillSendPass")}
                                <FormItem>
                                    {getFieldDecorator('phone')(
                                        <Input placeholder={translate("auth.phone")}/>
                                    )}
                                </FormItem>
                                {this.props.text}
                            </div>
                            <div className="login-form-control">
                                <Button disable={!(validatePhone(phone))}
                                        htmlType="submit"
                                        btnText= {translate("auth.sendLink")}
                                        size='large'
                                        type='gradient'/>
                                <div>{translate("auth.backTo")} {link}</div>
                            </div>
                        </Form>
                    )
                }
            </Translate>
        )
    }
}

const LoginForget = Form.create()(LoginForgetForm);

LoginForget.propTypes = {
    text: PropTypes.string,
    urlLogin: PropTypes.string,
    onUrlChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

LoginForget.defaultProps = {
    text: '',
    urlLogin: '',
    onUrlChange: null,
    onSubmit: () => {},
};

export default withRouter(LoginForget)
