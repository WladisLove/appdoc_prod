import React from 'react'
import PropTypes from 'prop-types'

import {Form} from 'antd';

import Input from '../Input'
import Upload from '../Upload'
import Hoc from '../Hoc'

const FormItem = Form.Item;

/* styles in style.css (importing in Step2.js)*/

class Step2_educ extends React.Component {

    static get getName() {
        return 'educ'
    }

    render() {
        const {getFieldDecorator, number} = this.props;

        return (
            <div className="step-block">

                <FormItem>
                    {getFieldDecorator('educationsgroup1-education-' + number, {
                        rules: [{
                            required: true,
                            message: 'Введите учебное заведение'
                        }],
                    })(
                        <Input addonBefore='* Учебное заведение'
                               className='step-form-item'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('educationsgroup1-speciality-' + number, {
                        rules: [{
                            required: true,
                            message: 'Введите специальность'
                        }],
                    })(
                        <Input addonBefore='* Специальность'
                               className='step-form-item'/>
                    )}
                </FormItem>
                <div className="step-row">
                    <FormItem>
                        {getFieldDecorator('educationsgroup1-finishucationyear-' + number, {
                            rules: [{
                                required: true,
                                message: 'Введите год окончания',
                                pattern: /^[ ]*[0-9]{4}[ ]*$/
                            }],
                        })(
                            <Input addonBefore='* Год окончания'
                                   className='step-form-item'/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('educationsgroup1-diplomphoto-' + number)(
                            <Upload
                                text="Прикрепить диплом, свидетельство"/>
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