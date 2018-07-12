import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import Checkbox from '../Checkbox'
import Select from '../Select'
import Radio from '../RadioBox'

import './style.css'
import '../../icon/style.css'
import {Form} from "antd/lib/index";

const FormItem = Form.Item;
const Option = Select.Option;

class PersonalInformationItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            experBlock: 0
        }
    }
    addPersonInfo = (values) => {
        let pr = this.props.profileDoctor;
        pr.langData = values.languagesField;
        pr.priceData = values.priceField;

        if(values.childrenField === 1) pr.consultChildren =  true;
        else pr.consultChildren =  false;
        pr.freeConsult = values.freeConsultField;

        return pr;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newProfile = this.addPersonInfo(values);
                this.props.form.resetFields();
                this.props.onSubmit(newProfile);
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;

        const langOptions = ['Английский', 'Русский', 'Немецкий', 'Японский'].map(lang => <Option key={lang}>{lang}</Option>);
        const priceData = ['менее 50 руб', '50 - 100 руб', '100 - 200 руб', '200 - 500 руб', '500 - 1000 руб', 'более 1000руб'];

        const priceOptions = priceData.map(price => <Option key={price}>{price}</Option>);
        const rootClass = cn('personal-information');
        const RadioGroup = Radio.Group;

        return (
                <Form className={rootClass} onSubmit={this.handleSubmit}>
                    <div className="personal-block">
                        <div className="personal-item">
                            <FormItem className="personal-item" >
                                {getFieldDecorator('languagesField', {
                                    initialValue: this.props.profileDoctor.langData,
                                    rules: [{
                                        required: true,
                                        message: 'Знание языков'
                                    }],
                                })(
                                    <Select  mode="multiple" placeholder="Знание языков">
                                      {langOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        <div className="personal-item">
                            <div className="radio-block">
                                <div className="radio-title">Консультация детей:</div>
                                <FormItem className="personal-item" >
                                    {getFieldDecorator('childrenField', {
                                        initialValue: this.props.profileDoctor.consultChildren ? 1 : 2,
                                        rules: [{
                                            required: true,
                                            message: 'Введите проводите ли консультацию с детьми'
                                        }],
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}>Да</Radio>
                                            <Radio value={2}>Нет</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                        <div className="personal-item">
                            <FormItem className="personal-item" >
                                {getFieldDecorator('priceField', {
                                    initialValue: this.props.profileDoctor.priceData,
                                })(
                                    <Select placeholder="Желаемая оплата">
                                      {priceOptions}
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        <div className="personal-item">
                            <div className="radio-block">
                                <div className="radio-title">Готовы проводить консультации бесплатно?</div>
                                <FormItem className="personal-item" >
                                    {getFieldDecorator('freeConsultField', {
                                        valuePropName: 'checked',
                                        initialValue: this.props.profileDoctor.freeConsult,
                                    })(
                                        <Checkbox>Да</Checkbox>
                                    )}
                                </FormItem>
                            </div>
                        </div>
                    </div>

                    <div className="personal-block">
                        <Button
                            htmlType="submit"
                            btnText='Сохранить изменения'
                            size='default'
                            type='float'
                        />
                    </div>
                </Form>
        )
    }
}
const PersonalInformationItem  = Form.create()(PersonalInformationItemForm);

export default PersonalInformationItem