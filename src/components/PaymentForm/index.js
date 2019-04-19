import React from 'react';
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { Form } from 'antd';
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Input from '../Input'


import './style.css'
import '../../icon/style.css'

const FormItem = Form.Item;

class PayForm extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submit(this.props.formPayment);
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
                    help: "Неверное имя или пароль",
                },{
                    validateStatus: 'error',
                }];
                break;
            case 500:
                error = [{
                    validateStatus: 'error',
                    help: "Такого пользователя не существует",
                },{
                    validateStatus: 'error',
                }];
                break;
            case 200:
            default:
                error = [];
        }

        return (
            <Form onSubmit={this.handleSubmit} method={"POST"} action={"https://test.paysec.by/pay/order.cfm"} className="login-form">
                <div className="login-title">Оплата</div>
              
               
               {/* INPUT TYPE="HIDDEN" NAME="Merchant_ID" VALUE="Ваш Merchant_ID"> 
                <INPUT TYPE="HIDDEN" NAME="OrderNumber" VALUE="A03032011_26"> 
                <INPUT TYPE="HIDDEN" NAME="OrderAmount" VALUE="6000"> 
                <INPUT TYPE="HIDDEN" NAME="OrderCurrency" VALUE="BYR"> 
                <INPUT TYPE="HIDDEN" NAME="FirstName" VALUE="Test"> 
                <INPUT TYPE="HIDDEN" NAME="LastName" VALUE="Testov"> 
                <INPUT TYPE="HIDDEN" NAME="Email" VALUE="test@test.by">
                <INPUT TYPE="HIDDEN" NAME="OrderComment" VALUE="Пример оплаты заказа"> 
                <INPUT TYPE="SUBMIT" NAME="Submit" VALUE="Оплатить"> */}

              
                <div className="login-form-control">
                    <Button htmlType="submit"
                            btnText='Подтвердить'
                            size='large'
                            type='gradient'
                            type="submit"
                            />
                   
                </div>
            </Form>
        )
    }
}

const PaymentForm = Form.create()(PayForm);

PaymentForm.propTypes = {
    errorCode: PropTypes.oneOf([0,200, 400, 500]),
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onSubmit: PropTypes.func,
};

PaymentForm.defaultProps = {
    errorCode: 0,
    urlForget: '',
    urlRegistration: '',
    onSubmit: () => {},
};

export default PaymentForm
