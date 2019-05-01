import React from 'react';
import { Translate } from 'react-localize-redux'
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
        return (<div>
            <Translate>
                {({ translate }) =>
                    (<div className="reviewAnsw">
                        <div className="reviewAnsw-icon">
                            <Icon type="enter" svg size={24}/>
                        </div>
                        <div className="reviewAnsw-body">
                            <TextArea placeholder={translate('form.textarea.yourText')}
                                      value={this.state.value}
                                      onChange={value => this.setState({value})}/>
                            <Button btnText={translate('button.title.submit')} onClick={this.btnHandler}/>
                        </div>
                    </div>)
                }
            </Translate>
        </div>)
    }
}

export default AnswerArea;
