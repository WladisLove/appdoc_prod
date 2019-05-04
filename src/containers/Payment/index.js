import React from 'react'
import * as actions from '../../store/actions'


import { InputNumber } from 'antd';

import './styles.css';
import {connect} from "react-redux";
import Card from './../../components/Card/index';
import Button from './../../components/Button/index';
import NewPaymentForm from '../../components/NewPaymentForm/index';
import { Translate } from 'react-localize-redux'

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
        
        let price = document.getElementById('wrapper-paymet-input')
            price = price && price.value 
       
        if ((!formPayment || formPayment.OrderAmount !== price) && price){
            this.props.onGetPaymentForm(this.props.id, price)
        }

        this.setState({ isPaymentForm: true })
    }

    render() {
       return (
        <Translate>
        {({ translate }) => 
            <div >
              
                    <Card title="Пополнить счет" bordered={false} style={{ width: '100%' }}>
                        <div className='wrapper-block'>
                            <div className='wrapper-paymet'>{translate('form.payment.label.previewPay')}</div>
                            
                            <div className='patient-contacts-block'>
                                <InputNumber id="wrapper-paymet-input"ref="inputPrice" min={0.01}  defaultValue={3} className='wrapper-paymet-input' step={0.01}/>
                            </div>
                            <div>
                                <Button btnText={translate('form.payment.button.pay')}
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
        }
        </Translate>

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

