import React from 'react';

import {Form, message} from 'antd';
import TextArea from '../TextArea'
import Button from '../Button'
import Spinner from "../Spinner";



class ContentForm extends React.Component {
    state = {
        message: "",
        loading: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.message) {
            this.setState({loading: true});
            this.props.onSend(this.state.message, window.location.href).then((res)=>{
                if(res.data.res) {
                    this.setState({loading:false});
                    this.props.onCancel();
                    message.success("Ваш отчёт отправлен")
                } else {
                    message.error("Произошла ошибка, попробуйте ещё раз")
                }
            })
        } else message.error("Опишите проблему");

    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible===true && this.props.visible===false) {
            this.setState({message:""})
        }
    }


    render() {

        return (
            <Form onSubmit={this.handleSubmit}
                  className="reportBugModal">

                <TextArea label='Опишите проблему'
                          value={this.state.message}
                          onChange={message => this.setState({message})}
                          className="reportBugModal-txtarea"
                />
                <Button size='default'
                        btnText='Отправить'
                        htmlType="submit"
                        type='float'
                        disable={this.state.loading}
                        style={{marginRight: "20px"}}

                />
                {this.state.loading && <Spinner size="small" isInline={true} /> }
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
