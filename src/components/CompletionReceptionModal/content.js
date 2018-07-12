import React from 'react';

import {Form} from 'antd';
import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'

const FormItem = Form.Item;

class ContentForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onComplete(this.props.form.getFieldsValue())
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const rootClass = 'completionReceptionModal';

        return (
            <Form onSubmit={this.handleSubmit}
                  className={rootClass}>

                    <FormItem>
                        {getFieldDecorator('diagnosis',{
                            rules: [{required: true, message: 'Ввведите диагноз',}]
                        })(
                            <Input className={rootClass + '-input'}
                                   placeholder="Диагноз"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('isChronic')(
                            <Checkbox className={rootClass + '-checkbox'}>
                                Добавить в список хронических болезней</Checkbox>
                        )}
                    </FormItem>
                    <Button 
                            htmlType="submit"
                            btnText="Завершить"
                            size="default"
                            type="float"
                    />
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
