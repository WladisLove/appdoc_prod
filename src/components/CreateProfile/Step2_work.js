import React from 'react'
import PropTypes from 'prop-types'

import {Form} from 'antd';

import InputNew from "../InputNew";
import DropZoneUpload from "../DropZoneUpload";


const FormItem = Form.Item;

/* styles in style.css (importing in Step2.js)*/

class Step2_work extends React.Component {

    static get getName() {
        return 'work'
    }

    render() {
        const {getFieldDecorator , number} = this.props;
        const {langs, payments} = this.props;

        return (
            <div className="step-block">
                    <FormItem>
                        {getFieldDecorator('work-worknow-'+number, {
                            rules: [{
                                required: true,
                                message: 'Введите текущее место работы'
                            }],
                        })(

                            <InputNew width ="100%" bubbleplaceholder="* Текущее место работы" className="step-form-item"/>
                        )}
                    </FormItem>
                <FormItem>
                    {getFieldDecorator('work-adress-'+number, {
                        rules: [{
                            required: true,
                            message: 'Введите адрес места работы'
                        }],
                    })(
                        <InputNew width ="100%" bubbleplaceholder="* Адрес места работы" className="step-form-item"/>

                        )}
                </FormItem>


                <div className="step-row">
                    <FormItem>
                        {getFieldDecorator('work-post-'+number, {
                            rules: [{
                                required: true,
                                message: 'Введите текущую должность'
                            }],
                        })(
                            <InputNew width ="100%" bubbleplaceholder="* Должность" className="step-form-item"/>

                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('work-copycontract-'+number, {
                            rules: [{
                                required: true,
                                message: 'Загрузите подтверждающий документ'
                            }],
                        })(
                            <DropZoneUpload
                                uploadFile = {this.props.uploadFile}
                                text="Прикрепить копию контракта"
                            />
                        )}
                    </FormItem>

                </div>





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