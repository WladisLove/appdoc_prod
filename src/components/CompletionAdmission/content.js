import React from 'react';

import {Form} from 'antd';
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'
import Checkbox from '../Checkbox'
import DatePicker from '../DatePicker'
import { Translate } from 'react-localize-redux'

const FormItem = Form.Item;

class ContentForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onComplete(this.props.form.getFieldsValue())
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const rootClass = 'admission_form';

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<Form onSubmit={this.handleSubmit}
                          className={rootClass}>

                            <FormItem>
                                {getFieldDecorator('diagnosis',{
                                    rules: [{required: true, message: translate('form.errors.input.enterDiagnosis')}]
                                })(
                                    <Input className={rootClass + '-input'}
                                           placeholder={translate('diagnosis')} />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('isChronic')(
                                    <Checkbox className={rootClass + '-checkbox'}>
                                        {translate('form.checkbox.addToListChronicDiseases')}
                                    </Checkbox>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('drug',{
                                    rules: [{required: true, message: translate('form.errors.select.enterDrug')}]
                                })(
                                    <Select
                                        className={rootClass + '-select'}
                                        mode="multiple"
                                        placeholder={translate('form.select.drugForUse')}
                                    >
                                        <Option value={translate('form.select.drug.analgin')}>
                                            {translate('form.select.drugs.analgin')}
                                        </Option>
                                        <Option value={translate('form.select.drug.paracetamol')}>
                                            {translate('form.select.drugs.paracetamol')}
                                        </Option>
                                        <Option value={translate('form.select.drug.vitaminC')}>
                                            {translate('form.select.drugs.vitaminC')}
                                        </Option>
                                    </Select>,
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('investigation',{
                                    rules: [{required: true, message: translate('form.errors.select.enterInvestigation')}]
                                })(
                                    <Select
                                        className={rootClass + '-select'}
                                        mode="multiple"
                                        placeholder={translate('investigation')}
                                    >
                                        <Option value={translate('form.select.investigation.completeBloodCount')}>
                                            {translate('form.select.investigation.completeBloodCount')}
                                        </Option>
                                    </Select>,
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('time')(
                                    <DatePicker range
                                        rangeSet={{
                                            placeholderStart: translate('notEarlier'),
                                            placeholderEnd: translate('notLater')
                                        }}
                                        delimiter='&mdash;'/>
                                )}
                            </FormItem>
                            <Button
                                    htmlType="submit"
                                    btnText={translate('button.title.complete')}
                                    size="default"
                                    type="float"
                            />
                    </Form>)
                }
            </Translate>
        </div>)
    }
}

const Content = Form.create()(ContentForm);

export default Content
