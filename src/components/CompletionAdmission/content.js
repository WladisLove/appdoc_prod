import React from 'react';

import {Form} from 'antd';
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'
import Checkbox from '../Checkbox'
import DatePicker from '../DatePicker'

const FormItem = Form.Item;
const rangeSet = {
    placeholderStart: 'Не ранее',
    placeholderEnd: 'Не позднее',
};
class ContentForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onComplete(this.props.form.getFieldsValue())
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const rootClass = 'admission_form';

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
                    <FormItem>
                        {getFieldDecorator('drug',{
                            rules: [{required: true, message: 'Ввведите препарат',}]
                        })(
                            <Select 
                                className={rootClass + '-select'}
                                mode="multiple"
                                placeholder="Препарат для приема"
                            >
                                <Option value="Анальгин">Анальгин</Option>
                                <Option value="Парацетамол">Парацетамол</Option>
                                <Option value="Аскорбиновая кислота">Аскорбиновая кислота</Option>
                            </Select>,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('investigation',{
                            rules: [{required: true, message: 'Ввведите исследование',}]
                        })(
                            <Select 
                                className={rootClass + '-select'}
                                mode="multiple"
                                placeholder="Исследование"
                            >
                                <Option value="Общий анализ крови">Общий анализ крови</Option>
                            </Select>,
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('time')(
                            <DatePicker range
                                rangeSet={rangeSet}
                                delimiter='&mdash;'/>
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
