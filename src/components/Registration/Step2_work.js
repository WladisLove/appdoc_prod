import React from 'react'
import PropTypes from 'prop-types'

import {Form} from 'antd';

import Input from '../Input'
import DatePicker from '../DatePicker'
import Upload from '../Upload'
import Button from '../Button'
import Hr from '../Hr'
import UploadBig  from '../UploadBig'


const FormItem = Form.Item;

/* styles in style.css (importing in Step2.js)*/

class Step2_work extends React.Component {

    render() {
        const {getFieldDecorator} = this.props;
        const {langs, payments} = this.props;

        return (
            <div className="step-block">
                <FormItem>
                    {getFieldDecorator('worknow', {
                        rules: [{
                            required: true,
                            message: 'Введите текущее место работы'
                        }],
                    })(
                        <Input addonBefore='* Текущее место работы'
                               className='step-form-item'/>
                    )}
                </FormItem>

                <div className="step-row">
                    <FormItem>
                        {getFieldDecorator('post', {
                            rules: [{
                                required: true,
                                message: 'Введите текущую должность'
                            }],
                        })(
                            <Input addonBefore='* Должность'
                                   className='step-form-item'/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('workdate', {
                            rules: [{
                                required: true,
                                message: 'Введите дату начала работы'
                            }],
                        })(
                            <DatePicker placeholder='* Дата начала работы'/>
                        )}
                    </FormItem>
                </div>
                <FormItem>
                    {getFieldDecorator('copycontract')(
                        <Upload 
                            text="Прикрепить копию контракта"/>
                    )}
                </FormItem>

                <Hr/>

                <div className="step-block-item">
                    <FormItem>
                        {getFieldDecorator('catigory', {
                            rules: [{
                                required: true,
                                message: 'Введите категорию'
                            }],
                        })(
                            <Input addonBefore='* Категория'
                                   className='step-form-item'/>
                        )}
                    </FormItem>
                </div>
                <FormItem>
                    {getFieldDecorator('photos',{
                        valuePropName: 'fileList',
                        getValueFromEvent: this.props.normFile,
                    })(
                        <UploadBig />
                    )}
                </FormItem>
            </div>
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