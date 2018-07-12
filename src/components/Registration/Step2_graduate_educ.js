import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'antd';

import Upload from '../Upload'
import Input from '../Input'
import DatePicker from '../DatePicker'

const FormItem = Form.Item;

/* styles in style.css (importing in Step2.js)*/

class Step2_graduate_educ extends React.Component{

    static get getName() {
        return 'grad_educ'
    }

    render(){
        const { getFieldDecorator, number } = this.props;

        return (
            <div className="step-block">
                <FormItem>
                    {getFieldDecorator('educationsgroup2-education-'+number)(
                        <Input addonBefore='Учебное заведение'
                               className='step-form-item'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('educationsgroup2-ciklname-'+number)(
                        <Input addonBefore='Название цикла обучения'
                               className='step-form-item'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('educationsgroup2-ucationyears-'+number)(
                        <DatePicker range placeholderStart="Начало обучения" placeholderEnd="Окончание обучения"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('educationsgroup2-diplomphoto-'+number)(
                        <Upload text="Прикрепить диплом (сертификат, свидетельство)"/>
                    )}
                </FormItem>
            </div>
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