import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import moment from 'moment'

import './style.css'
import '../../icon/style.css'
import InputNew from "../InputNew";
import Button from '../Button'
import {Form, message} from "antd";
import {Translate} from "react-localize-redux";
import DatePicker from "../DatePicker";
const FormItem = Form.Item;

class PatientAccardionDiseaseItemForm extends React.Component{
    addDisease = (e, translate) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAddChronic(values)
                    .then((res) => {
                        if (res.data.code === 200) {
                            message.success(translate("notifications.saved"));
                            this.props.form.resetFields();
                        }
                        else{
                            message.error(translate("notifications.anErrorOccurredTryAgain"))
                        }
                    })
            } else {
                console.log(err);
            }
        });
    };

    deleteDisease = (id, translate) => {
        this.props.onDeleteChronic(id)
            .then((res) => {
                if (res.data.code === 200) {
                    message.success(translate("notifications.saved"));
                    this.props.form.resetFields();
                }
                else{
                    message.error(translate("notifications.anErrorOccurredTryAgain"))
                }
            })
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const { diseases } = this.props;
        const rootClass = cn('disease');
        return (
            <Form>
                <Translate>
                    {({ translate }) => (<div className={rootClass}>
                        <div className='disease-item'>
                            <div className='disease-item-list'>
                               {diseases.map((item, index)=> {
                                return item.diseases !== "Аллергия на нет" ? (
                                    <div className='disease-item-actions'>
                                        <div className='disease-item-li' key={index+1}>
                                            {item.diseases} (c {moment(item.date*1000).format("DD.MM.YYYY")})
                                        </div>
                                        <button onClick={()=>this.deleteDisease(item.id, translate)}>X</button>
                                    </div>
                                    ) : (<div></div>)
                            })}
                            </div>
                            <div className="add-disease-action">
                                <FormItem className="input-form-item">
                                    {getFieldDecorator('diseases', {
                                        initialValue: '',
                                        rules: [{ required: true,
                                            message: translate('personal.chronic.enterDisease')
                                        }],
                                    })(
                                        <InputNew width ="100%" bubbleplaceholder={translate("personal.chronic.diseaseOrAllergy")}/>
                                    )}
                                </FormItem>
                                <FormItem className='start-disease-date'>
                                    <div className='radio-label'>
                                        <span className='start-disease-date-title'>{translate("personal.chronic.chronicDiseaseStartDate")}</span>
                                        {getFieldDecorator('date', {
                                            rules: [{
                                                required: true,
                                                message: translate("personal.chronic.inputDate")
                                            }],
                                        })(
                                            <DatePicker placeholder={translate("auth.birthdayFormat")}/>
                                        )}
                                    </div>
                                </FormItem>
                                <Button
                                    btnText={translate('button.title.add')}
                                    onClick={(e)=>this.addDisease(e, translate)}
                                    size='default'
                                    type='float'
                                    style={{marginRight: "20px"}}
                                />
                            </div>
                        </div>
                    </div>)}
                </Translate>
            </Form>
        )
    }
}

PatientAccardionDiseaseItemForm.propTypes = {
    title: PropTypes.string,
    diseases: PropTypes.array,
    diseaseDate: PropTypes.string,

};

PatientAccardionDiseaseItemForm.defaultProps = {
    title: '',
    diseases: [],
    diseaseDate: '',

};

const PatientAccardionDiseaseItem  = Form.create()(PatientAccardionDiseaseItemForm);


export default PatientAccardionDiseaseItem
