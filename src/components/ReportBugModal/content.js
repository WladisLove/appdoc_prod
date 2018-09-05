import React from 'react';

import {Form, message} from 'antd';
import TextArea from '../TextArea'
import Button from '../Button'



class ContentForm extends React.Component {
    state = {
        message: '',
    }

    handleSubmit = (e) => {
        !this.state.message && message.error("Опишите проблему");
        e.preventDefault();
        let response = {
            message: this.state.message,
        };
        this.props.onSend(response)
    };

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
                        type='float'/>
            </Form>
        )
    }
}

const Content = Form.create()(ContentForm);

export default Content
