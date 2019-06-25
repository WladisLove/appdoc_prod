import React from 'react'
import PropTypes from 'prop-types'
import {Translate} from "react-localize-redux";

import {Form} from 'antd';

import InputNew from "../InputNew";
import DropZoneUpload from "../DropZoneUpload";


const FormItem = Form.Item;

/* styles in style.css (importing in Step2.js)*/

class Step2_work extends React.Component {

    static get getName() {
        return 'work'
    }
    componentDidMount() {
        const { number } = this.props;
        const { setFieldsValue } = this.props.form;
        const name = "work-adress-"+number;

        window.ymaps && window.ymaps.ready(function () {
            const suggest = new window.ymaps.SuggestView('work-adress-' + number);
            suggest.events.add("select", event => {
                setFieldsValue({
                    [name]: event.get("item").value,
                })
            });
            console.log(suggest);
        })

    }
    render() {
        const {getFieldDecorator, number} = this.props;

        return (
            <Translate>
                {({translate}) =>
                    (
                        <div className="step-block">
                            <FormItem>
                                {getFieldDecorator('work-worknow-' + number, {
                                    rules: [{
                                        required: true,
                                        message: translate("auth.errors.inputCurrentWorkPlace")
                                    }],
                                })(
                                    <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.currentWorkPlace")}`} className="step-form-item"/>
                                )}
                            </FormItem>
                            <FormItem className="work-address-block">
                                {getFieldDecorator('work-adress-' + number, {
                                    rules: [{
                                        required: true,
                                        message: translate("auth.errors.inputWorkAddress")
                                    }],
                                })(
                                    <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.workAddress")}`}
                                              className="step-form-item"/>
                                )}
                            </FormItem>


                            <div className="step-row">
                                <FormItem>
                                    {getFieldDecorator('work-post-' + number, {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.inputPosition")
                                        }],
                                    })(
                                        <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.position")}`}
                                                  className="step-form-item"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('work-copycontract-' + number, {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.uploadConfirmingDoc")
                                        }],
                                    })(
                                        <DropZoneUpload
                                            uploadFile={this.props.uploadFile}
                                            text={translate("auth.addContractCopy")}
                                        />
                                    )}
                                </FormItem>

                            </div>


                        </div>
                    )
                }
            </Translate>
        )
    }
}

Step2_work.propTypes = {
    langs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
    })),
    payments: PropTypes.array,
}

Step2_work.defaultProps = {
    langs: [],
    payments: [],
}

export default Step2_work
