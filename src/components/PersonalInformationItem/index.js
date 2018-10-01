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
import SelectNew from "../SelectNew";

const FormItem = Form.Item;
const Option = Select.Option;

class PersonalInformationItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            experBlock: 0
        }
    }
    preparePersonInfo = (values) => {
        return {
            langData: values.language,
            consultChildren: values.isChildConsult,
            priceData: values.consultPayment,
            freeConsult: values.isFreeConsult
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let newProfile = this.preparePersonInfo(values);
                console.log(newProfile);
                this.props.onSubmit(newProfile);
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        const {langData, consultChildren, priceData, freeConsult} = this.props.profileDoctor;
        console.log(this.props.profileDoctor);
        const {langs, payments} = this.props;

        const rootClass = cn('personal-information');
        const RadioGroup = Radio.Group;

        return (
                <Form className={rootClass} onSubmit={this.handleSubmit}>
                    <div className="personal-block">
                        <FormItem>
                            {getFieldDecorator('language', {
                                initialValue: langData
                            })(

                                <SelectNew width ="100%"
                                           bubbleplaceholder="Владение языками"
                                           className="personal-block-form-item"
                                           mode="multiple"
                                           data={langs}
                                />
                            )}
                        </FormItem>
                        <div className='radio-label'>Консультация детей:
                            {getFieldDecorator('isChildConsult', {
                                initialValue: consultChildren
                            })(
                                <RadioGroup>
                                    <Radio value={true}>Да</Radio>
                                    <Radio value={false}>Нет</Radio>
                                </RadioGroup>
                            )}
                        </div>
                        <FormItem>
                            {getFieldDecorator('consultPayment', {
                                initialValue: priceData
                            })(
                                <SelectNew width ="100%"
                                           bubbleplaceholder="Желаемая сумма оплаты за консультацию"
                                           className="personal-block-form-item"
                                           data={payments}
                                />
                            )}
                        </FormItem>
                        <div className='radio-label'>Готовы проводить консультации бесплатно?
                            {getFieldDecorator('isFreeConsult', {
                                initialValue: freeConsult
                            })(
                                <RadioGroup>
                                    <Radio value={true}>Да</Radio>
                                    <Radio value={false}>Нет</Radio>
                                </RadioGroup>
                            )}
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