import React from 'react'
import * as actions from '../../store/actions'


import { InputNumber } from 'antd';

import './styles.css';
import {connect} from "react-redux";
import Card from './../../components/Card/index';
import Button from './../../components/Button/index';
import PaymentForm from '../../components/PaymentForm/index';


class Payment extends React.Component{

    constructor() {
        super();
        this.state = {
            bankCard: {
                linked: true
            },
            yandexMoney: {
                linked: false
            },
            modalVisible: false,
            isPaymentForm: false
        };
    }
    
    getPayment = () => {
        let price = this.refs.inputnumber.inputNumberRef.cursorBefore;
        this.setState({ isPaymentForm: true})
        console.log("this.price", this.refs.inputnumber.inputNumberRef.cursorBefore)
        this.props.onGetPaymentForm(this.props.id, price)
    }

    render() {
      
        return (
            <div >
                <Card title="Пополнить счет" bordered={false} style={{ width: '100%' }}>
                    <div className='wrapper-block'>
                        <div className='wrapper-paymet'>Введите сумму пополнения</div>
                        
                        <div className='patient-contacts-block'>
                            <InputNumber ref="inputnumber" min={0.01}  defaultValue={3} className='wrapper-paymet-input' step={0.01}/>
                        </div>
                        <div>
                            <Button btnText="Оплатить"
                            className='payment-btn-pay'
                                onClick={this.getPayment}
                            size='small'
                            type='float'/>
                        </div>
                                  
                    </div>
                </Card>

                {this.state.isPaymentForm && <PaymentForm 
                    formPayment={this.props.formPayment}
                    submit={this.props.onPayBalance}
            />}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        id: state.auth.id,
        formPayment: state.patients.formPayment
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetPaymentForm: (id, price) => dispatch(actions.getPaymentForm(id, price)),
        onPayBalance: (data) => dispatch(actions.payBalance(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

