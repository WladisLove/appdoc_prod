import React from 'react';
import cn from 'classnames'

import Button from '../Button'
import Radio from '../RadioBox'

import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'
import {Form} from "antd/lib/index";
import SelectNew from "../SelectNew";

import addInfoObj from "../../helpers/addInfoObj";
import TextArea from "../TextArea";

const FormItem = Form.Item;

class PersonalInformationItemForm extends React.Component{
    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const toSubmitObj = values;
                toSubmitObj.language = values.language.join(',');
                toSubmitObj.consultationPrice = values.consultationPrice.toString();
                this.props.onSubmit(toSubmitObj);
            }
        });
    };

    render(){
        const { langs } = this.props;
        const { getFieldDecorator } = this.props.form;

        let {language, isChildConsult, consultationPrice, isFreeConsult, about} = this.props.profileDoctor;

        const rootClass = cn('personal-information');
        const RadioGroup = Radio.Group;

        console.log('language', language)
        console.log('langs :', langs);
        console.log("----------------------------------------------------");
        return (
                <Form className={rootClass} onSubmit={this.handleSubmit}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                               
                    <div className="personal-block">
                        <FormItem>
                            {getFieldDecorator('language', {
                                initialValue: Array.isArray(language) ? language.map(el => el.id) : []
                            })(

                                <SelectNew width ="100%"
                                           bubbleplaceholder={translate(`personal.form.select.language`)}
                                           className="personal-block-form-item"
                                           mode="multiple"
                                           data={langs}
                                />
                            )}
                        </FormItem>
                        <div className='radio-label'>{translate(`personal.form.radio.childrensConsultation`)}
                            {getFieldDecorator('isChildConsult', {
                                initialValue: isChildConsult
                            })(
                                <RadioGroup>
                                    <Radio value={true}>{translate(`yes`)}</Radio>
                                    <Radio value={false}>{translate(`no`)}</Radio>
                                </RadioGroup>
                            )}
                        </div>
                        <FormItem>
                            {getFieldDecorator('consultationPrice', {
                                initialValue: consultationPrice
                            })(
                                <SelectNew width ="100%"
                                           bubbleplaceholder={translate(`personal.form.select.consultationPrice`)}
                                           className="personal-block-form-item"
                                           data={addInfoObj.payments}
                                />
                            )}
                        </FormItem>
                        <div className='radio-label'>{translate(`personal.form.radio.freeConsult`)}
                            {getFieldDecorator('isFreeConsult', {
                                initialValue: isFreeConsult
                            })(
                                <RadioGroup>
                                    <Radio value={true}>{translate(`yes`)}</Radio>
                                    <Radio value={false}>{translate(`no`)}</Radio>
                                </RadioGroup>
                            )}
                        </div>
                        <FormItem>
                            <div className="textarea-label">{translate(`about`)}</div>
                            {getFieldDecorator('about', {
                                initialValue: about
                            })(

                                            <SelectNew width ="100%"
                                                       bubbleplaceholder={translate(`personal.form.select.language`)}
                                                       className="personal-block-form-item"
                                                       mode="multiple"
                                                       data={langs}
                                            />
                                        )}
                                    </FormItem>
                                    <div className='radio-label'>{translate(`personal.form.radio.childrensConsultation`)}
                                        {getFieldDecorator('isChildConsult', {
                                            initialValue: isChildConsult
                                        })(
                                            <RadioGroup>
                                                <Radio value={true}>{translate(`yes`)}</Radio>
                                                <Radio value={false}>{translate(`no`)}</Radio>
                                            </RadioGroup>
                                        )}
                                    </div>
                                    <FormItem>
                                        {getFieldDecorator('consultationPrice', {
                                            initialValue: consultationPrice
                                        })(
                                            <SelectNew width ="100%"
                                                       bubbleplaceholder={translate(`personal.form.select.consultationPrice`)}
                                                       className="personal-block-form-item"
                                                       data={addInfoObj.payments}
                                            />
                                        )}
                                    </FormItem>
                                    <div className='radio-label'>{translate(`personal.form.radio.freeConsult`)}
                                        {getFieldDecorator('isFreeConsult', {
                                            initialValue: isFreeConsult
                                        })(
                                            <RadioGroup>
                                                <Radio value={true}>{translate(`yes`)}</Radio>
                                                <Radio value={false}>{translate(`no`)}</Radio>
                                            </RadioGroup>
                                        )}
                                    </div>
                                    <FormItem>
                                        <div className="textarea-label">{translate(`about`)}</div>
                                        {getFieldDecorator('about', {
                                            initialValue: about
                                        })(
                                              <textarea className="textarea-field" style={{height: "200px"}} />
                                        )}
                                    </FormItem>
                                </div>

                                <div className="personal-block">
                                    <Button
                                        htmlType="submit"
                                        btnText={translate(`button.title.saveChanges`)}
                                        size='default'
                                        type='float'
                                    />
                                </div>
                            </div>)
                        }
                    </Translate>
                </Form>
        )
    }
}
const PersonalInformationItem  = Form.create()(PersonalInformationItemForm);

export default PersonalInformationItem
