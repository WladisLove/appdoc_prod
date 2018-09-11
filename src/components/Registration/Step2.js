import React from 'react';
import PropTypes from 'prop-types'
import { Form } from 'antd';
import Step2_educ from './Step2_educ'
import Step2_graduate_educ from './Step2_graduate_educ'
import Step2_work from './Step2_work'
import Step2_additional from './Step2_additional'
import Button from '../Button'
import Hr from '../Hr'
import Upload from '../Upload'
import Dropzone from 'react-dropzone'
import SelectNew from "../SelectNew";
import InputNew from "../InputNew";

const FormItem = Form.Item;

class Step2_From extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            educNum: this.props.data.educNum || 1,
            gradEducNum: this.props.data.gradEducNum || 1,
            placesNum: this.props.data.placesNum || 1,
            isCategory: this.props.data.isCategory || false,
            isDegree : this.props.data.isDegree || false,
            isStatus: this.props.data.isStatus || false,
            accepted: []

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
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values, "VALUES STEP 2");
            if (!err) {
                let toSubmit = {
                    ...values,
                    ...this.state,
                };
                this.props.onSubmit(toSubmit);
                this.props.onNext();
            }
        })
    };

    handleGoBack = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let fields = {
                ...values,
                ...this.state,
            };
            this.props.onSubmit(fields);
            this.props.onPrev();
        })
    };

    selectChangeHandler = (e, name) => {
        const validate = () => {
            this.props.form.validateFields([
                'academicdegreedoc',
                'academicstatusdoc',
                'categorydoc'], { force: true })};
        switch (name){

            case "degree":
                e === "Нет степени" ? this.setState({isDegree: false}, validate) : this.setState({isDegree: true}, validate);
                return;
            case "status":
                e === "Нет звания" ? this.setState({isStatus: false}, validate) : this.setState({isStatus: true},validate);
                return;
            case "category":
                e === "Нет категории" ? this.setState({isCategory: false}, validate): this.setState({isCategory: true},validate);
                return;

            default: return;
        }
    };

    addFormElem = (Component,num,fieldDecorator) => {
        let i = 1,
            name = Component.getName,
            formArr = [<Component getFieldDecorator={fieldDecorator}
                                  normFile={this.normFile}
                                  key={name + 0}
                                  specs = {this.props.specs}
                                  form = {this.props.form}
                                  number={0}/>,];
        while (i < num){
            formArr.push(<Hr key={'hr_' + name + i}/>);
            formArr.push(<Component getFieldDecorator={fieldDecorator}
                                    normFile={this.normFile}
                                    form = {this.props.form}
                                    specs = {this.props.specs}
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

    handleDrop = (files) => {
      console.log(files[0], "FILES FROM DROP ZONE");
      this.props.uploadFile(files[0])
        .then(res => {
          console.log(res)
          this.setState({accepted: [...this.state.accepted, res.data.file[0]]})
        })
    };
    render(){
      console.log(this.state.accepted, "ACCEPTED");
        const {getFieldDecorator} = this.props.form;
        const {academicDegree, academicTitle, category,  langs, payments} = this.props;

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

                <div className="step-block-title">Последипломное образование</div>
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

                        <SelectNew width ="100%"
                                   bubbleplaceholder="Учёная степень"
                                   className="step-form-item"
                                   data={academicDegree}
                                   onChange={(e)=>this.selectChangeHandler(e,"degree")}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('academicdegreedoc', {
                        rules: [{
                            required: this.state.isDegree,
                            message: 'Загрузите подтверждающий документ'
                        }],
                    })(
                        <Upload 
                            text="Прикрепить документ, подтверждающий ученую степень"/>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('academicstatus')(
                        <SelectNew width ="100%"
                        bubbleplaceholder="Учёное звание"
                        className="step-form-item"
                        data={academicTitle}
                        onChange={(e)=>this.selectChangeHandler(e,"status")}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('academicstatusdoc', {
                        valuePropName: "docsfiles",
                        rules: [{
                            required: this.state.isStatus,
                            message: 'Загрузите подтверждающий документ'
                        }]

                    })(<div>
                          <Dropzone
                            onDrop={this.handleDrop}
                            style = {{width: "100%"}}
                            multiple={false}
                            docsfiles={this.state.accepted}

                          >
                                <Button btnText="Прикрепить документ, подтверждающий ученое звание"
                                        size='upload'
                                        type='upload'
                                        icon='upload'
                                        iconSize={36}
                                        svg
                                        onClick={e => e.preventDefault()}
                                />
                          </Dropzone>
                          {
                            this.state.accepted && this.state.accepted.map(f => <div key={f.name}>{f.name} - {f.size} bytes</div>)
                          }
                      </div>
                    )}
                </FormItem>


                <div className="step-block-title">Сведения о работе</div>
                {this.addFormElem(Step2_work, this.state.placesNum, getFieldDecorator)}
                <Button onClick={e => this.increaseStateNum(e, 'placesNum')}
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

                    {getFieldDecorator('category', {
                        rules: [{
                            required: true,
                            message: 'Введите категорию'
                        }],
                    })(
                        <SelectNew width ="100%"
                                   bubbleplaceholder="* Категория"
                                   className="step-form-item"
                                   data={category}
                                   onChange={(e)=>this.selectChangeHandler(e,"category")}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('categorydoc', {
                        rules: [{
                            required: this.state.isCategory,
                            message: 'Загрузите подтверждающий документ'
                        }],
                    })(
                        <Upload
                            text="Прикрепить документ, подтверждающий категорию"/>
                    )}
                </FormItem>
                <Hr/>
                <FormItem>

                    {getFieldDecorator('experience', {
                        rules: [{
                            required: true,
                            message: 'Введите общий стаж работы'
                        }],
                    })(
                        <InputNew width ="100%" bubbleplaceholder="* Общий стаж работы" className="step-form-item"/>

                    )}
                </FormItem>


                <div className="step-block-title">Дополнительная информация</div>
                <Step2_additional getFieldDecorator={getFieldDecorator}
                                  langs={langs}
                                  payments={payments}/>

                <div className="steps-action">
                    <Button onClick={this.handleGoBack}
                            btnText='Назад'
                            size='large'
                            type='float'
                            style = {{marginRight: "20px"}}
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
            if (key !== 'current' && props.data[key]){
                if(key.indexOf("ucationyears") + 1) {
                    fields[key] = Form.createFormField({
                        value: {defaultStartValue: props.data[key][0] , defaultEndValue: props.data[key][1]}
                    })
                } else {
                    fields[key] = Form.createFormField({
                        value: props.data[key],
                    })
                }
            }
        }
        return fields;
    },
})(Step2_From);

Step2.propTypes = {
    urlForget: PropTypes.string,
    urlRegistration: PropTypes.string,
    academicDegree: PropTypes.array,
    academicTitle: PropTypes.array,
    langs: PropTypes.array,
    payments: PropTypes.array,
    onSubmit: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func
};

Step2.defaultProps = {
    urlForget: '',
    urlRegistration: '',
    academicDegree: [],
    academicTitle: [],
    langs: [],
    payments: [],
    onSubmit: () => {},
    onNext: () => {},
    onPrev: () => {}
};

export default Step2
