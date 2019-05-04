import React from 'react';
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { Form } from 'antd';
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import Checkbox from '../Checkbox'
import Input from '../Input'
import { Translate } from 'react-localize-redux'

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

        return (
            formPayment ? 
            <Translate>
            {({ translate, activeLanguage }) => 
                <form className="payment-form" action="https://test.paysec.by/pay/order.cfm" method="POST"> 
                        <div className='wrapper-paymet'>
                            <p>{translate('form.payment.label.payNumber')}: {formPayment.OrderNumber}</p>
                        </div>
                        <div className='wrapper-paymet'>
                            <p>{translate('form.payment.label.amount')}: {formPayment.OrderAmount}</p>
                        </div>
                        <div className='wrapper-paymet'>
                            <p>{translate('form.payment.label.currency')}: {formPayment.OrderCurrency}</p>
                        </div>
                    <input type="HIDDEN" name="Merchant_ID" value={formPayment.Merchant_ID} /> 
                    <input type="HIDDEN" name="OrderNumber" value={formPayment.OrderNumber} />
                    <input type="HIDDEN" name="OrderAmount" value={formPayment.OrderAmount} />
                    <input type="HIDDEN" name="OrderCurrency" value={formPayment.OrderCurrency} />
                    <input type="HIDDEN" name="FirstName" value={formPayment.FirstName} />
                    <input type="HIDDEN" name="LastName" value={formPayment.LastName} /> 
                    <input type="HIDDEN" name="Email" value={formPayment.Email} /> 
                    <input type="HIDDEN" name="OrderComment" value={formPayment.OrderComment} /> 
                    <input type="HIDDEN" name="Language" value={activeLanguage.code.toUpperCase()} /> 
                    <div className="payment-form-control">
                            <Button type="submit"
                                btnText={translate('form.payment.label.confirm')}
                                size='large'
                                type='gradient'
                                class='payment-btn-pay'
                                value="Оплатить"
                            />
                        </div>
                </form>}  
            </Translate>
            : null)
            
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
