import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import Upload from '../Upload'
import Checkbox from '../Checkbox'
import Select from '../Select'
import DatePicker from '../DatePicker'
import Input from '../Input'
import Modal from '../Modal'

import './style.css'
import '../../icon/style.css'
import {Form} from "antd/lib/index";
import PersonalInformation from "../PersonalInformation";
import InputNew from "../InputNew";
import DropZoneUpload from "../DropZoneUpload";
import {profileDoctor} from "../PersonalContactItem/mock-data";
const FormItem = Form.Item;
const Option = Select.Option;

class PersonalExperienceItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            experBlock: 0,
            placesNum: this.props.profileDoctor.worknow.length || 1,
            changedWorkFields: [],
            idDeleteWork: null
        }
    }
    sendPersonWork = (values) => {
        let inst  = {...this.props.profileDoctor};
        //let inst  = profileDoctor.arrayExpWork;
        let idInst = null;
        try{
            idInst = (inst.arrayExpWork[inst.arrayExpWork.length-1].id + 1);
        }
        catch(e) {
            idInst = 0;
        }

        let dateStart = null;
        if(values.datePickerWork){ // for server
            dateStart = values.datePickerWork/*.format("D.M.Y")*/;
            //dateStart = Math.floor(( +values.datePickerWork.format('x')) / 1000); // ?
        }
        inst.arrayExpWork.push(
            {
                id           : idInst,
                post         : values.workPosition,
                placeOfWord  : values.workPlace,
                dateStart    : dateStart,
                isWorking    : values.confirmWork,
                documents    : values.workDocument
            });
        return inst;
    };

    /*sendCategory = (values) => {
        let inst  = {...this.props.profileDoctor};
        inst.category = values.categoryField;
        return inst;
    };*/

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err/* && this.state.experBlock !== 0*/) {
                /*let newProfile = null;
                switch(this.state.experBlock){
                    case 1: newProfile = this.sendPersonWork(values);
                        break;
                    case 2: newProfile = this.sendCategory(values);
                        break;
                }*/
                //this.props.form.resetFields();
                //this.setState({experBlock : 0});
                let sendObj = {
                    ...values
                };
                this.props.onSubmit(sendObj);
            }
        });
    };

    /*renderDp2 = (getFieldDecorator) =>{
        let dpArr2 = [];
        if(this.state.experBlock === 2) {
            dpArr2.push(
                <div className="personal-item" key={this.state.experBlock}>
                    <FormItem className="personal-item" >
                        {getFieldDecorator('categoryField', {
                            rules: [{
                                required: true,
                                message: 'Введите врачебную категорию'
                            }],
                        })(
                            <Select placeholder="Ученая степень">
                                <Option value="Высшая категория">Высшая категория</Option>
                                <Option value="1-ая категория">Первая категория</Option>
                                <Option value="2-ая категория">Вторая категория</Option>
                                <Option value="Нет категории">Без категории</Option>
                            </Select>
                        )}
                    </FormItem>
                </div>
            )
        }
        return (
            <div className="new-d">
                {dpArr2}
            </div>
            );
    };*/

    renderWorkPlace = () => {
        const { getFieldDecorator } = this.props.form;
        const profileDoctor = this.props.profileDoctor;

        let placesArr = [];
        for (let i = 0; i < this.state.placesNum; i++)
            placesArr.push(<div className="personal-block">
                <FormItem>
                    {getFieldDecorator('work-worknow-' + i, {
                        initialValue: profileDoctor['work-worknow-' + i] ? profileDoctor['work-worknow-' + i] : "",
                        rules: [{
                            required: true,
                            message: 'Введите текущее место работы'
                        }],
                    })(
                        <InputNew width="100%" bubbleplaceholder="* Текущее место работы" className="step-form-item"
                                  onChange={() => this.setState({changedWorkFields: [...this.state.changedWorkFields, i]})}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('work-adress-' + i, {
                        initialValue: profileDoctor['work-adress-' + i] ? profileDoctor['work-adress-' + i] : "",
                        rules: [{
                            required: true,
                            message: 'Введите адрес места работы'
                        }],
                    })(
                        <InputNew width="100%" bubbleplaceholder="* Адрес места работы" className="step-form-item"
                                  onChange={() => this.setState({changedWorkFields: [...this.state.changedWorkFields, i]})}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('work-post-' + i, {
                        initialValue: profileDoctor['work-post-' + i] ? profileDoctor['work-post-' + i] : "",
                        rules: [{
                            required: true,
                            message: 'Введите текущую должность'
                        }],
                    })(
                        <InputNew width="100%" bubbleplaceholder="* Должность" className="step-form-item"
                                  onChange={() => this.setState({changedWorkFields: [...this.state.changedWorkFields, i]})}/>
                    )}
                </FormItem>

                {(!profileDoctor['work-copycontract-' + i] || this.state.changedWorkFields.includes(i)) &&
                <FormItem>
                    {getFieldDecorator('work-copycontract-' + i, {
                        rules: [{
                            required: true,
                            message: 'Загрузите подтверждающий документ'
                        }],
                    })(
                        <DropZoneUpload
                            uploadFile={this.props.uploadFile}
                            text="Прикрепить копию контракта"
                        />
                    )}
                </FormItem>}

            </div>);
        return placesArr;
    };

    increaseStateNum = (e, type) => {
        e.preventDefault();
        this.setState(prev =>
            ({[type]: prev[type] +1}))
    };

    decreaseStateNum = (e, type) => {
        e.preventDefault();
        this.setState(prev =>
            ({[type]: prev[type] -1}))
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {arrayExpWork,  expWork} = this.props.profileDoctor;
        const category = this.props.profileDoctor.category;

        const rootClass = cn('personal-experience');
        return (
                <Form className={rootClass} onSubmit={this.handleSubmit}>
                    {this.renderWorkPlace()}
                    <div>
                        <Button onClick={e => this.increaseStateNum(e, 'placesNum')}
                                className="personal-btn"
                                btnText='Добавить'
                                size='small'
                                type='no-brd'
                                icon='plus'
                                iconSize={11}
                                svg
                                style={{
                                    marginLeft:"100px",
                                    marginRight:"10px"
                                }}
                        />
                        {this.state.placesNum > 1 && <Button onClick={e => this.decreaseStateNum(e, 'placesNum')}
                                                             className="personal-btn"
                                                             btnText='Удалить'
                                                             size='small'
                                                             type='no-brd'
                                                             icon='remove'
                                                             iconSize={11}
                                                             svg
                        />}
                    </div>
                    <div className="personal-block">
                        <Button
                            htmlType="submit"
                            btnText='Сохранить изменения'
                            size='default'
                            type='float'
                        />
                    </div>
                </Form>
        )
    }
}

const PersonalExperienceItem  = Form.create()(PersonalExperienceItemForm);

PersonalExperienceItem.propTypes = {
    profileDoctor: PropTypes.object
};

PersonalExperienceItem.defaultProps = {
    profileDoctor: {}
};

export default PersonalExperienceItem