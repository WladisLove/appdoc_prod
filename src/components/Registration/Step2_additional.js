import React from 'react'

import { Form } from 'antd';

import Select from '../Select'
import Radio from '../RadioBox'
import SelectNew from "../SelectNew";
import TextArea from "../TextArea";
import {Translate} from "react-localize-redux";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/* styles in style.css (importing in Step2.js)*/

class Step2_additional extends React.Component {

    render(){
        const {getFieldDecorator,langs, payments} = this.props;

        return (
            <Translate>
                {({translate}) =>
                    (
                        <div className="step-block">
                            <FormItem>
                                {getFieldDecorator('language')(
                                    <SelectNew width="100%"
                                               bubbleplaceholder={translate("auth.langSkills")}
                                               className="step-form-item"
                                               mode="multiple"
                                               data={langs}
                                    />
                                )}
                            </FormItem>
                            <div className='radio-label'>{translate("auth.childrenConsult")}
                                {getFieldDecorator('isChildConsult', {
                                    initialValue: false
                                })(
                                    <RadioGroup>
                                        <Radio value={true}>{translate("yes")}</Radio>
                                        <Radio value={false}>{translate("no")}</Radio>
                                    </RadioGroup>
                                )}
                            </div>


                            <FormItem>
                                {getFieldDecorator('consultPayment')(
                                    <SelectNew width="100%"
                                               bubbleplaceholder={translate("auth.paymentAmount")}
                                               className="step-form-item"
                                               data={payments}
                                    />
                                )}
                            </FormItem>
                            <div className='radio-label'>{translate("auth.readyToFreeConsult")}
                                {getFieldDecorator('isFreeConsult', {
                                    initialValue: false
                                })(
                                    <RadioGroup>
                                        <Radio value={true}>{translate("yes")}</Radio>
                                        <Radio value={false}>{translate("no")}</Radio>
                                    </RadioGroup>
                                )}
                            </div>
                            <FormItem>
                                {getFieldDecorator('about')(
                                    <TextArea label={translate("auth.aboutMyself")}
                                              className="step-form-item"
                                              style={{height: "200px"}}

                                    />
                                )}
                            </FormItem>
                        </div>
                    )
                }
            </Translate>
        )
    }
}


export default Step2_additional
