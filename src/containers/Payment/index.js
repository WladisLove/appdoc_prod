import React from 'react'
import * as actions from '../../store/actions'


import { InputNumber } from 'antd';

import './styles.css';
import {connect} from "react-redux";
import Card from './../../components/Card/index';
import Button from './../../components/Button/index';
import NewPaymentForm from '../../components/NewPaymentForm/index';


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
        const {formPayment} = this.props;
        console.log('this.refs.inputPrice.inputNumberRef.state :', this.refs.inputPrice.inputNumberRef.state);
        let price = this.refs.inputPrice.inputNumberRef.state.value;       

        if (!formPayment || formPayment.OrderAmount !== price){
            this.props.onGetPaymentForm(this.props.id, price)
        }

        this.setState({ isPaymentForm: true })
    }

    render() {
       return (
            <div >
                <Card title="Пополнить счет" bordered={false} style={{ width: '100%' }}>
                    <div className='wrapper-block'>
                        <div className='wrapper-paymet'>Введите сумму пополнения</div>
                        
                        <div className='patient-contacts-block'>
                            <InputNumber ref="inputPrice" min={0.01}  defaultValue={3} className='wrapper-paymet-input' step={0.01}/>
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

                <NewPaymentForm 
                    visible={this.state.isPaymentForm}
                    formPayment={this.props.formPayment}
                    onCancel={() => this.setState({isPaymentForm:false})}
                    name={this.props.shortDocInfo ? this.props.shortDocInfo.name : ''}
                />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        id: state.auth.id,
        formPayment: state.patients.formPayment,
        shortDocInfo: state.doctor.shortInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetPaymentForm: (id, price) => dispatch(actions.getPaymentForm(id, price)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

