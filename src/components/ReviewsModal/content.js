import React from 'react';

import { Form } from 'antd';
import TextArea from '../TextArea'
import Rate from '../Rate'
import Button from '../Button'
import {message} from "antd"
import moment from "moment";
import Spinner from "../Spinner";

const FormItem = Form.Item;

class ContentForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: '',

        };
    }
    handleChange = (value) => {
        this.setState({value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            comment: this.state.message,
            rating: this.state.value,
            date: moment().format("X"),
            ...this.props.info
        };
        this.setState({loading:true}, () => {
            this.props.onSubmit(obj).then((res) => {
                console.log(res, "RES");
                if(res.status===200) {
                    this.setState({loading:false});
                    this.props.onCancel(res.status)
                } else {console.log(res.status)}


            })
                .then()
        })
    };
    render(){
        return (
            <Form onSubmit={this.handleSubmit}
                  className="cancelVisitModal">
                <p>С целью повышения качества услуг просим поставить рейтинг или оставить отзыв.</p>
                <FormItem>
                    <Rate onChange = {this.handleChange} value={this.state.value}defaultValue={0} starSize={20}/>
                    <span className="rate-number">{this.state.value ? this.state.value : 0}</span>
                </FormItem>
                <TextArea label='Текст отзыва'
                          value={this.state.message}
                          onChange={message => this.setState({message})}
                          className="cancelVisitModal-txtarea"/>
                <Button htmlType="submit"
                        size='default'
                        btnText='Сохранить'
                        type='float'/> {this.state.loading &&<Spinner isInline={true} size = "small"/>}
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
