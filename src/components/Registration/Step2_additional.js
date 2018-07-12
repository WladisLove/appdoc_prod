import React from 'react'

import { Form } from 'antd';

import Select from '../Select'
import Radio from '../RadioBox'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/* styles in style.css (importing in Step2.js)*/

class Step2_additional extends React.Component{

    render(){
        const {getFieldDecorator,langs, payments} = this.props;

        return (
            <div className="step-block">
                <FormItem>
                    {getFieldDecorator('langs')(
                        <Select mode="multiple" placeholder="Какими языками владеете">
                            {langs.map((elem,i) => <Select.Option key={elem.value+''+i}
                                                              value={elem.value}>
                                {elem.title}</Select.Option>)}
                        </Select>
                    )}
                </FormItem>
                <div className='radio-label'>Консультация детей:
                    <FormItem>
                        {getFieldDecorator('isChildConsult')(
                            <RadioGroup>
                                <Radio value={true}>Да</Radio>
                                <Radio value={false}>Нет</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </div>


                <FormItem>
                    {getFieldDecorator('consultPayment')(
                        <Select placeholder="Желаемая сумма оплаты за консультацию">
                            {payments.map((elem,i) => <Select.Option key={elem+''+i}
                                                              value={elem}>
                                {elem}</Select.Option>)}
                        </Select>
                    )}
                </FormItem>
                <div className='radio-label'>Готовы проводить консультации бесплатно?
                    {getFieldDecorator('isFreeConsult')(
                        <RadioGroup>
                            <Radio value={true}>Да</Radio>
                            <Radio value={false}>Нет</Radio>
                        </RadioGroup>
                    )}
                </div>
            </div>
        )
    }
}


export default Step2_additional