import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'antd';

import InputNew from "../InputNew";
import RangeDPNew from "../RangeDPNew";
import DropZoneUpload from "../DropZoneUpload";
import {Translate} from "react-localize-redux";
import { AutoComplete } from 'antd';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

const FormItem = Form.Item;

class Step2_graduate_educ extends React.Component{
    state = {
      isName: false,
        isCycle: false,
        isDate: false,
        isFile: false
    };
    static get getName() {
        return 'grad_educ'
    }

    validateYears = (rule, value, cb) => {

        if( (this.state.isName || this.state.isCycle || this.state.isDate || this.state.isFile) && !this.state.isDate) {
            cb(<Translate id={'auth.errors.inputStudyPeriod'}/>)
        }
        if((value && value[0] && value[1]) || (value && !value[0] && !value[1]) || !value) {
            cb()
        } else cb(<Translate id={'auth.errors.inputStudyPeriod'}/>)
    }
    handleChange = (e, name) => {
        const validate = () => {
            this.props.form.validateFields([
                'educationsgroup2-education-'+this.props.number,
                'educationsgroup2-ciklname-'+this.props.number,
                'educationsgroup2-ucationyears-'+this.props.number,
                'educationsgroup2-diplomphoto-'+this.props.number], { force: true })};
        switch (name){

            case "eduName":
                e.target.value ? !this.state.isName ? this.setState({isName: true}, validate) : null : this.setState({isName: false}, validate);
                return;
            case "eduCycle":
                e.target.value ? !this.state.isCycle ? this.setState({isCycle: true},validate) : null : this.setState({isCycle: false}, validate);
                return;
            case "eduDate":
                (e[0] && e[1]) ? !this.state.isDate ? this.setState({isDate: true},validate) : null : this.setState({isDate: false},validate);
                return;
            case "eduFile":
                e.length ? !this.state.isFile? this.setState({isFile: true},validate): null : this.setState({isFile: false},validate);
                return;

            default: return;
        }
    };

    render() {
        const {getFieldDecorator, number} = this.props;
        return (
            <Translate>
                {({translate}) =>
                    (
                        <div className="step-block">
                            <FormItem>
                                {getFieldDecorator('educationsgroup2-education-' + number, {
                                    rules: [{
                                        required: this.state.isName || this.state.isCycle || this.state.isDate || this.state.isFile,
                                        message: translate("auth.errors.inputUniversityName")
                                    }],
                                })(
                                    <AutoComplete
                                        className="reg-auto-complete"
                                        style={{ width: '100%' }}
                                        dataSource={this.props.selectorToolTip}
                                        placeholder={translate('auth.universityName')}
                                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('educationsgroup2-ciklname-' + number, {
                                    rules: [{
                                        required: this.state.isName || this.state.isCycle || this.state.isDate || this.state.isFile,
                                        message: translate("auth.errors.inputCourseName")
                                    }],
                                })(
                                    <InputNew width="100%" bubbleplaceholder={translate("auth.courseName")}
                                              className="step-form-item"
                                              onChange={(e) => this.handleChange(e, "eduCycle")}/>
                                )}
                            </FormItem>
                            <div className="step-row">
                                <FormItem>
                                    {getFieldDecorator('educationsgroup2-ucationyears-' + number, {
                                        valuePropName: 'rangeSet',
                                        rules: [{
                                            validator: this.validateYears
                                        }],
                                    })(
                                        <RangeDPNew
                                            onChange={(e) => this.handleChange(e, "eduDate")}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('educationsgroup2-diplomphoto-' + number, {
                                        rules: [{
                                            required: this.state.isName || this.state.isCycle || this.state.isDate || this.state.isFile,
                                            message: translate("auth.errors.uploadConfirmingDoc")
                                        }],
                                    })(
                                        <DropZoneUpload
                                            uploadFile={this.props.uploadFile}
                                            text={translate("auth.addDiplomaCertificate")}
                                            onChange={(e) => this.handleChange(e, "eduFile")}


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


Step2_graduate_educ.propTypes = {
    number: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
};

Step2_graduate_educ.defaultProps = {
    number: 0,
};

export default Step2_graduate_educ