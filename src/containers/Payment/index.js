import React from 'react'



import { InputNumber } from 'antd';

import './styles.css';
import {connect} from "react-redux";
import Card from './../../components/Card/index';
import Button from './../../components/Button/index';

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
            modalVisible: false
        };
    }



    render() {
      
        return (
            <div >
                <Card title="Пополнить счет" bordered={false} style={{ width: '100%' }}>
                    <div className='wrapper-block'>
                        <div className='wrapper-paymet'>Введите сумму пополнения</div>
                        
                        <div className='patient-contacts-block'>
                            <InputNumber min={0.01}  defaultValue={3} className='wrapper-paymet-input' step={0.01}/>
                        </div>
                        <div>
                            <Button btnText="Оплатить"
                            className='payment-btn-pay'
                            onClick={()=> {}}
                            size='small'
                            type='float'/>
                        </div>
                                  
                    </div>
                </Card>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        //freeIntervals: state.patients.freeIntervals,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

