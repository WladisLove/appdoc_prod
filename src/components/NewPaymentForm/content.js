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

class PayForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(this.props.formPayment);
            }
        });
    };

    render() {
        const { errorCode, urlForget, urlRegistrationDoctor, urlRegistrationPatient } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { formPayment } = this.props;


        console.log('formPayment :', formPayment);
        return (
            <Form className="payment-form" action={"https://test.paysec.by/pay/order.cfm"} >
                {formPayment && <div>
                    <div className='wrapper-paymet'>
                        <p>ID: {formPayment.Merchant_ID}</p>
                    </div>
                    <div className='wrapper-paymet'>
                        <p>Номер заказа: {formPayment.OrderNumber}</p>
                    </div>
                    <div className='wrapper-paymet'>
                        <p>Сумма: {formPayment.OrderAmount}</p>
                    </div>
                    <div className='wrapper-paymet'>
                        <p>Валюта: {formPayment.OrderCurrency}</p>
                    </div>
                    <div className='wrapper-paymet'>
                        <p>Имя: {formPayment.FirstName} {formPayment.LastName}</p>
                    </div>
                    <div className='wrapper-paymet'>
                        <p>Email: {formPayment.Email}</p>
                    </div>
                    <div className='wrapper-paymet'>
                        <p>Комментарий: {formPayment.OrderComment}</p>
                    </div>
                    <div className="payment-form-control">
                        <Button htmlType="submit"
                            btnText='Подтвердить'
                            size='large'
                            type='gradient'
                            class='payment-btn-pay'
                            onClick={this.handleSubmit}
                        />
                    </div>
                </div>}
                {/* INPUT TYPE="HIDDEN" NAME="Merchant_ID" VALUE="Ваш Merchant_ID"> 
                <INPUT TYPE="HIDDEN" NAME="OrderNumber" VALUE="A03032011_26"> 
                <INPUT TYPE="HIDDEN" NAME="OrderAmount" VALUE="6000"> 
                <INPUT TYPE="HIDDEN" NAME="OrderCurrency" VALUE="BYR"> 
                <INPUT TYPE="HIDDEN" NAME="FirstName" VALUE="Test"> 
                <INPUT TYPE="HIDDEN" NAME="LastName" VALUE="Testov"> 
                <INPUT TYPE="HIDDEN" NAME="Email" VALUE="test@test.by">
                <INPUT TYPE="HIDDEN" NAME="OrderComment" VALUE="Пример оплаты заказа"> 
                <INPUT TYPE="SUBMIT" NAME="Submit" VALUE="Оплатить"> */}

            </Form>
        )
    }
}

const PaymentForm = Form.create()(PayForm);

PaymentForm.propTypes = {
    errorCode: PropTypes.oneOf([0, 200, 400, 500]),
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    onSubmit: PropTypes.func,
};

PaymentForm.defaultProps = {
    errorCode: 0,
    urlForget: '',
    urlRegistration: '',
    onSubmit: () => { },
};

export default PaymentForm
