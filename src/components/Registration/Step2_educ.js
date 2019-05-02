import React from 'react'
import PropTypes from 'prop-types'

import {Form} from 'antd';

import InputNew from "../InputNew";
import SelectNew from "../SelectNew";
import DropZoneUpload from "../DropZoneUpload";
import {Translate} from "react-localize-redux";
import { AutoComplete } from 'antd';

const FormItem = Form.Item;
const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
/* styles in style.css (importing in Step2.js)*/

class Step2_educ extends React.Component {

    static get getName() {
        return 'educ'
    }

    render() {
        const {getFieldDecorator, number,selectorToolTip} = this.props;
        const specs = this.props.docSpecialities;

        return (
            <Translate>
                {({translate}) =>
                    (
                        <div className="step-block">
                            <FormItem>
                                {getFieldDecorator('educationsgroup1-education-' + number, {
                                    rules: [{
                                        required: true,
                                        message: translate("auth.errors.inputUniversityName")
                                    }],
                                })(
                                   <AutoComplete
                                      className="reg-auto-complete"
                                      style={{ width: '100%' }}
                                      dataSource={this.props.selectorToolTip}
                                      placeholder="* Учебное заведение"
                                      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                  />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('educationsgroup1-speciality-' + number, {
                                    rules: [{
                                        required: true,
                                        message: translate("auth.errors.inputQualification")
                                    }],
                                })(
                                    <SelectNew width="100%"
                                               bubbleplaceholder={`* ${translate("auth.qualification")}`}
                                               className="step-form-item"
                                               mode="multiple"
                                               data={specs}
                                    />
                                )}
                            </FormItem>
                            <div className="step-row">
                                <FormItem>
                                    {getFieldDecorator('educationsgroup1-finishucationyear-' + number, {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.inputGraduationYear")

                                        }, {
                                            pattern: /^[ ]*[0-9]{4}[ ]*$/,
                                            message: translate("auth.errors.wrongYearFormat")
                                        }],
                                    })(
                                        <InputNew width="100%" bubbleplaceholder={`* ${translate("auth.graduationYear")}`}
                                                  className="step-form-item"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('educationsgroup1-diplomphoto-' + number, {
                                        rules: [{
                                            required: true,
                                            message: translate("auth.errors.uploadConfirmingDoc")
                                        }],
                                    })(
                                        <DropZoneUpload
                                            uploadFile={this.props.uploadFile}
                                            text={translate("auth.addDiplomaCertificate")}
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

Step2_educ.propTypes = {
    number: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
};

Step2_educ.defaultProps = {
    number: 0,
};

export default Step2_educ
