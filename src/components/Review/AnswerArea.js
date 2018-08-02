import React from 'react';

import TextArea from '../TextArea'
import Icon from '../Icon'
import Button from '../Button'

class AnswerArea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
        }
    }

    btnHandler = () => {
        this.props.onSend(this.state.value);
        this.setState({value: ''})
    };

    render() {
        return (
            <div className="reviewAnsw">
                <div className="reviewAnsw-icon">
                    <Icon type="enter" svg size={24}/>
                </div>
                <div className="reviewAnsw-body">
                    <TextArea placeholder="Ваш текст"
                              value={this.state.value}
                              onChange={value => this.setState({value})}/>
                    <Button btnText='Отправить' onClick={this.btnHandler}/>
                </div>
            </div>
        )
    }
}

export default AnswerArea;