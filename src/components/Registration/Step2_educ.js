import React from 'react'
import PropTypes from 'prop-types'

import {Form} from 'antd';

import InputNew from "../InputNew";
import SelectNew from "../SelectNew";
import DropZoneUpload from "../DropZoneUpload";
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
            <div className="step-block">

                <FormItem>
                    {getFieldDecorator('educationsgroup1-education-' + number, {
                        rules: [{
                            required: true ,
                            message: 'Введите учебное заведение'
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
                            message: 'Введите квалификацию'
                        }],
                    })(
                        <SelectNew width ="100%"
                                   bubbleplaceholder="* Квалификация"
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
                                message: 'Введите год окончания',

                            },{
                                pattern: /^[ ]*[0-9]{4}[ ]*$/,
                                message: "Неправильной формат года"
                            }],
                        })(
                            <InputNew width ="100%" bubbleplaceholder="* Год окончания" className="step-form-item"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('educationsgroup1-diplomphoto-' + number, {
                            rules: [{
                                required: true,
                                message: 'Загрузите подтверждающий документ'
                            }],
                        })(
                            <DropZoneUpload
                            uploadFile = {this.props.uploadFile}
                            text="Прикрепить диплом, свидетельство"
                            />
                        )}
                    </FormItem>
                </div>

            </div>
        )
    }
}

// const Step2_educ = Form.create()(Step2_educ_Form);

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
