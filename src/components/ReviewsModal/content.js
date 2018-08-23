import React from 'react';

import { Form } from 'antd';
import TextArea from '../TextArea'
import Rate from '../Rate'
import Button from '../Button'

import {previewFile} from '../../helpers/modifyFiles'

const FormItem = Form.Item;

class ContentForm extends React.Component{
    constructor(props){
        super(props);
        const {rangeSet} = props;

        this.state = {
            dpNum: rangeSet.length || 1,
            rangeSet: rangeSet,
            message: '',
        };
    }

    render(){
        const { rateValue } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}
                  className="cancelVisitModal">
                <p>С целью повышения качества услуг просим поставить рейтинг или оставить отзыв.</p>
                <FormItem>
                    <Rate defaultValue={2} starSize={20}/>
                </FormItem>
                <TextArea label='Текст отзыва'
                          value={this.state.message}
                          onChange={message => this.setState({message})}
                          className="cancelVisitModal-txtarea"/>
                <Button htmlType="submit"
                        size='default'
                        btnText='Сохранить'
                        type='float'/>
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
