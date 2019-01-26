import React from 'react';
import {Form, message} from 'antd';
import { Translate } from 'react-localize-redux'
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
                    message.success(<Translate id="notifications.reportHasBeenSent" />)
                } else {
                    message.error(<Translate id="notifications.anErrorOccurredTryAgain" />)
                }
            })
        } else message.error(<Translate id="emergencyVisit.describeProblem" />);

    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.visible===true && this.props.visible===false) {
            this.setState({message:""})
        }
    }


    render() {
        return (<div>
            <Translate>
                {({ translate }) =>
                    (<Form onSubmit={this.handleSubmit}
                          className="reportBugModal">

                        <TextArea label={translate('emergencyVisit.describeProblem')}
                                  value={this.state.message}
                                  onChange={message => this.setState({message})}
                                  className="reportBugModal-txtarea"
                        />
                        <Button size='default'
                                btnText={translate('button.title.submit')}
                                htmlType="submit"
                                type='float'
                                disable={this.state.loading}
                                style={{marginRight: "20px"}}

                        />
                        {this.state.loading && <Spinner size="small" isInline={true} /> }
                    </Form>)
                }
            </Translate>
        </div>)
    }
}

const Content = Form.create()(ContentForm);

export default Content
