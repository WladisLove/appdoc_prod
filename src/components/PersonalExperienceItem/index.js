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
const FormItem = Form.Item;
const Option = Select.Option;

class PersonalExperienceItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            experBlock: 0,
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
    sendCategory = (values) => {
        let inst  = {...this.props.profileDoctor};
        inst.category = values.categoryField;
        return inst;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err && this.state.experBlock !== 0) {
                let newProfile = null;
                switch(this.state.experBlock){
                    case 1: newProfile = this.sendPersonWork(values);
                        break;
                    case 2: newProfile = this.sendCategory(values);
                        break;
                }
                this.props.form.resetFields();
                this.setState({experBlock : 0});
                this.props.onSubmit(newProfile);
            }
        });
    };


    deleteWork = (id) => {
        let newProfile = this.props.profileDoctor;

        this.setState({idDeleteWork: id});
        let newArray = [];
        newProfile.arrayExpWork.map((elem) => {
            if(elem.id !== id) return newArray.push(elem);
        });
        newProfile.arrayExpWork = newArray;

        this.props.onSubmit(newProfile);
    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    addDp = () => { this.setState({experBlock: 1}) };

    renderDp = (getFieldDecorator) =>{
        let dpArr = [];

        if(this.state.experBlock === 1) {
            dpArr.push(
                <div className="personal-item" key={this.state.experBlock}>

                    <FormItem className="personal-item" >
                        {getFieldDecorator('workPlace', {
                            rules: [{
                                required: true,
                                message: 'Введите место работы'
                            }],
                        })(
                            <Input addonBefore="Наименование места работы" />
                        )}
                    </FormItem>
                    <FormItem className="personal-item" >
                        {getFieldDecorator('workPosition', {
                            rules: [{
                                required: true,
                                message: 'Введите должность'
                            }],
                        })(
                            <Input addonBefore="Должность"/>
                        )}
                    </FormItem>

                    <FormItem className="personal-item" >
                        {getFieldDecorator('datePickerWork', {
                            rules: [{
                                required: true,
                                message: 'Введите дату начала работы'
                            }],
                        })(
                            <DatePicker placeholder="Дата начала работы" showTime format="DD.MM.YYYY"/>
                        )}
                    </FormItem>

                    <FormItem className="personal-item" >
                        {getFieldDecorator('confirmWork', {
                            valuePropName: 'checked',
                            initialValue: false,
                            rules: [{
                                required: true,
                                message: 'Введите подтверждение работы'
                            }],
                        })(
                            <Checkbox>Продолжаю работать</Checkbox>
                        )}
                    </FormItem>
                    <FormItem className="personal-item" >
                        {getFieldDecorator('workDocument', {
                        })(
                            <Upload text="Прикрепить копию контракта"/>
                        )}
                    </FormItem>
                </div>
            )
        }
        return (
            <div className="new-d">
                {dpArr}
            </div>
        );
    };

    addDp2 = () => {
        this.setState({experBlock: 2})
    };

    renderDp2 = (getFieldDecorator) =>{
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
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const {arrayExpWork,  expWork} = this.props.profileDoctor;
        let works = (this.props.profileDoctor.arrayExpWork).map((elem) => {
                return (
                    <div key={elem.id}>
                        <div className="personal-item">
                            <Button
                                onClick={() => this.deleteWork(elem.id)}
                                className="personal-delete"
                                btnText='Удалить'
                                size='link'
                                type='link'
                                icon='circle_close'
                                iconSize={16}
                                svg
                            />
                        </div>
                        <div className="personal-item mb-35">
                            <div className="personal-info"><b>{elem.post}</b></div>
                            <div className="personal-info"><p>{elem.placeOfWord}</p></div>
                            <div className="personal-info"><p>{elem.dateStart.format('YYYY')} - настоящее время</p></div>
                        </div>
                    </div> );
            });
        const category = this.props.profileDoctor.category;

        const rootClass = cn('personal-experience');

        return (
                <Form className={rootClass} onSubmit={this.handleSubmit}>
                    <div className="personal-block">
                        <div className="personal-item">
                            <div className="expWork">Опыт работы ( {expWork} )</div>
                        </div>
                        <div className="personal-title">Текущее место работы</div>

                        {works}
                        <div className="personal-item">
                             <Button onClick={this.addDp}
                                className="personal-btn"
                                btnText='Добавить'
                                size='small'
                                type='no-brd'
                                icon='plus'
                                iconSize={11}
                                svg
                            />
                        </div>
                        {this.renderDp(getFieldDecorator)}
                    </div>

                    <div className="personal-block">
                        {category}
                        <div className="personal-item add_category">
                             <Button onClick={this.addDp2}
                             className="personal-btn"
                                btnText='Добавить категорию'
                                size='small'
                                type='no-brd'
                                icon='plus'
                                iconSize={11}
                                svg
                            />
                        </div>
                        {this.renderDp2(getFieldDecorator)}

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