import React from 'react';
import PropTypes from 'prop-types'

import { Form } from 'antd';

import Step2_educ from './Step2_educ'
import Step2_graduate_educ from './Step2_graduate_educ'
import Step2_work from './Step2_work'
import Step2_additional from './Step2_additional'

import Button from '../Button'
import Hr from '../Hr'
import Select from '../Select'

import Upload from '../Upload'


import './style.css'
import '../../icon/style.css'

const FormItem = Form.Item;

class Step2_From extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            educNum: 1,
            gradEducNum: 1,
        }
    }

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let toSubmit = {
                    ...values,
                    ...this.state,
                };

                this.props.onSubmit(toSubmit);
                this.props.onNext();
            }
        });
    };

    addFormElem = (Component,num,fieldDecorator) => {
        let i = 1,
            name = Component.getName,
            formArr = [<Component getFieldDecorator={fieldDecorator}
                                  normFile={this.normFile}
                                  key={name + 0}
                                  number={0}/>,];
        while (i < num){
            formArr.push(<Hr key={'hr_' + name + i}/>);
            formArr.push(<Component getFieldDecorator={fieldDecorator}
                                    normFile={this.normFile}
                                    key={name + i}
                                    number={i}/>);
            i++;
        }
        return formArr;
    };

    increaseStateNum = (e, type) => {
        e.preventDefault();
        this.setState(prev =>
            ({[type]: prev[type] +1}))
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        const {academicDegree, academicTitle, langs, payments} = this.props;

        return (
            <Form onSubmit={this.handleSubmit} className="step-form">
                <div className="step-posttitle">Заполните сведения об образовании и работе</div>
                <div className="step-notification">Просим образование по основным специальностям указывать в блоке Образование (с дипломом и свидетельством), а по дополнительным квалификационным программам  (в том числе присвоение ученой степени) - в блоке Последипломное образование.</div>
                <div className="step-notification">* Поля, обязательные для заполнения</div>

                <div className="step-block-title">Сведения об образовании</div>
                {this.addFormElem(Step2_educ, this.state.educNum, getFieldDecorator)}
                <Button onClick={e => this.increaseStateNum(e, 'educNum')}
                        className="personal-btn"
                        btnText='Добавить'
                        size='small'
                        type='no-brd'
                        icon='plus'
                        iconSize={11}
                        svg
                />

                <div className="step-block-title-post">Последипломное образование</div>
                {this.addFormElem(Step2_graduate_educ, this.state.gradEducNum, getFieldDecorator)}
                <Button onClick={e => this.increaseStateNum(e, 'gradEducNum')}
                        className="personal-btn"
                        btnText='Добавить'
                        size='small'
                        type='no-brd'
                        icon='plus'
                        iconSize={11}
                        svg
                />

                <Hr/>
                <FormItem>
                    {getFieldDecorator('academicdegree')(
                        <Select placeholder="Ученая степень">
                            {academicDegree.map(elem => <Select.Option key={elem.value}
                                                              value={elem.value}>
                                {elem.title}</Select.Option>)}
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('academicdegreedoc')(
                        <Upload 
                            text="Прикрепить документ, подтверждающий ученую степень"/>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('academicstatus')(
                        <Select placeholder="Ученое звание">
                            {academicTitle.map(elem => <Select.Option key={elem.value}
                                                              value={elem.value}>
                                {elem.title}</Select.Option>)}
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('academicstatusdoc')(
                        <Upload text="Прикрепить документ, подтверждающий ученое звание"/>
                    )}
                </FormItem>


                <div className="step-block-title">Сведения о работе</div>
                <Step2_work getFieldDecorator={getFieldDecorator}
                            normFile={this.normFile}/>

                <div className="step-block-title">Дополнительная информация</div>
                <Step2_additional getFieldDecorator={getFieldDecorator}
                                  langs={langs}
                                  payments={payments}/>

                <div className="steps-action">
                    <Button onClick={this.props.onPrev}
                            btnText='Назад'
                            size='large'
                            type='float'
                    />
                    <Button htmlType="submit"
                            btnText='Далее'
                            size='large'
                            type='gradient'
                    />
                </div>
            </Form>
        )
    }
}

const Step2 = Form.create({
    mapPropsToFields(props) {
        let fields ={};
        for (let key in props.data){
            if (key !== 'current'){
                fields[key] = Form.createFormField({
                    value: props.data[key],
                })
            }
        }
        return fields;
    },
})(Step2_From);

Step2.propTypes = {
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    academicDegree: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
    })),
    academicTitle: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
    })),
    langs: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string,
    })),
    payments: PropTypes.array,
    onSubmit: PropTypes.func,
};

Step2.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    academicDegree: [],
    academicTitle: [],
    langs: [],
    payments: [],
    onSubmit: () => {},
};

export default Step2
