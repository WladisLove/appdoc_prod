import React from 'react';
import {Form} from 'antd';
import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'
import { Translate } from 'react-localize-redux'

const FormItem = Form.Item;

class ContentForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.onComplete(this.props.form.getFieldsValue())
            }
        })

    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const rootClass = 'completionReceptionModal';

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<Form onSubmit={this.handleSubmit}
                          className={rootClass}>

                            <FormItem>
                                {getFieldDecorator('diagnosis',{
                                    rules: [{required: true, message: translate('conclusion.writePreliminaryConclusion')}]
                                })(
                                    <Input className={rootClass + '-input'}
                                           placeholder={translate('conclusion.preliminary')}/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('isChronic')(
                                    <Checkbox className={rootClass + '-checkbox'}>
                                        {translate('form.checkbox.addToListChronicDiseases')}
                                    </Checkbox>
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
