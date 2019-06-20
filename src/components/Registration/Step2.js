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
import DropZoneUpload from '../DropZoneUpload'
import SelectNew from "../SelectNew";
import InputNew from "../InputNew";
import {Translate} from "react-localize-redux";


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
                e === "Без категории" ? this.setState({isCategory: false}, validate): this.setState({isCategory: true},validate);
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
                                  form = {this.props.form}
                                  fileToState={this.fileToState}
                                  uploadFile={this.props.uploadFile}
                                  docSpecialities={this.props.docSpecialities}
                                  selectorToolTip={this.props.selectorToolTip}
                                  number={0}/>,];
        while (i < num){
            formArr.push(<Hr key={'hr_' + name + i}/>);
            formArr.push(<Component getFieldDecorator={fieldDecorator}
                                    normFile={this.normFile}
                                    form = {this.props.form}
                                    key={name + i}
                                    fileToState={this.fileToState}
                                    uploadFile={this.props.uploadFile}
                                    docSpecialities={this.props.docSpecialities}
                                    selectorToolTip={this.props.selectorToolTip}
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
    decreaseStateNum = (e, type) => {
        e.preventDefault();
        this.setState(prev =>
            ({[type]: prev[type] -1}))
    };

    getAvailProfs = () => {
        const { availableProfs } = this.props;
        const lang = window.localStorage.getItem("lang");
        return availableProfs.map(el => lang === "ru" ? el.nameRus : el.nameEng);
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {academicDegree, academicTitle, category,  langs, payments, selectorToolTip} = this.props;

        return (
        <Translate>
        {({translate}) =>
            (
            <Form onSubmit={this.handleSubmit} className="step-form">
                 <div className="step-posttitle">{translate("auth.inputEduAndWorkInfo")}</div>
                <div className="step-notification">{translate("auth.eduWish")}</div>
                <div className="step-notification">{translate("auth.requiredFields")}</div>

                <div className="step-block-title">{translate("auth.eduInfo")}</div>
                {this.addFormElem(Step2_educ, this.state.educNum, getFieldDecorator)}
                <div>
                    <Button onClick={e => this.increaseStateNum(e, 'educNum')}
                        className="personal-btn"
                        btnText={translate("button.title.add")}
                        size='small'
                        type='no-brd'
                        icon='plus'
                        iconSize={11}
                        svg
                        style={{marginRight:"10px"}}
                    />
                    {this.state.educNum>1 && <Button onClick={e => this.decreaseStateNum(e, 'educNum')}
                        className="personal-btn"
                        btnText={translate("button.title.delete")}
                        size='small'
                        type='no-brd'
                        icon='remove'
                        iconSize={11}
                        svg
                    />}
                </div>

                <div className="step-block-title">{translate("auth.postgraduateEdu")}</div>
                {this.addFormElem(Step2_graduate_educ, this.state.gradEducNum, getFieldDecorator)}
                <div>
                    <Button onClick={e => this.increaseStateNum(e, 'gradEducNum')}
                            className="personal-btn"
                            btnText={translate("button.title.add")}
                            size='small'
                            type='no-brd'
                            icon='plus'
                            iconSize={11}
                            svg
                            style={{marginRight:"10px"}}
                    />
                    {this.state.gradEducNum >1 && <Button onClick={e => this.decreaseStateNum(e, 'gradEducNum')}
                            className="personal-btn"
                            btnText={translate("button.title.delete")}
                            size='small'
                            type='no-brd'
                            icon='remove'
                            iconSize={11}
                            svg
                    />}
                </div>
                <FormItem>
                    {getFieldDecorator('profile', {
                        rules: [{
                            required: true,
                            message: translate("auth.errors.inputJobProfile")
                        }],
                    })(

                        <SelectNew width ="100%"
                                   bubbleplaceholder={translate("auth.profile")}
                                   className="step-form-item"
                                   data={this.getAvailProfs()}
                                   onChange={(e)=>this.selectChangeHandler(e,"degree")}
                        />
                    )}
                </FormItem>
                <Hr/>
                <FormItem>
                    {getFieldDecorator('academicdegree')(

                        <SelectNew width ="100%"
                                   bubbleplaceholder={translate("auth.academicDegree")}
                                   className="step-form-item"
                                   data={academicDegree.map(el => translate(el))}
                                   onChange={(e)=>this.selectChangeHandler(e,"degree")}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('academicdegreedoc', {
                        rules: [{
                            required: this.state.isDegree,
                            message: translate("auth.errors.uploadConfirmingDoc")
                        }],
                    })(
                        <DropZoneUpload
                            uploadFile = {this.props.uploadFile}
                            text={translate("auth.addDegreeDocument")}
                        />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('academicstatus')(
                        <SelectNew width ="100%"
                        bubbleplaceholder={translate("auth.academicTitle")}
                        className="step-form-item"
                        data={academicTitle.map(el => translate(el))}
                        onChange={(e)=>this.selectChangeHandler(e,"status")}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('academicstatusdoc', {
                        rules: [{
                            required: this.state.isStatus,
                            message: translate("auth.errors.uploadConfirmingDoc")
                        }]

                    })(
                        <DropZoneUpload
                            uploadFile = {this.props.uploadFile}
                            text={translate("auth.addTitleDocument")}
                        />
                    )}
                </FormItem>


                <div className="step-block-title">{translate("auth.workInfo")}</div>
                {this.addFormElem(Step2_work, this.state.placesNum, getFieldDecorator)}

                <div>
                    <Button onClick={e => this.increaseStateNum(e, 'placesNum')}
                            className="personal-btn"
                            btnText={translate("button.title.add")}
                            size='small'
                            type='no-brd'
                            icon='plus'
                            iconSize={11}
                            svg
                            style={{marginRight:"10px"}}
                    />
                    {this.state.placesNum > 1 && <Button onClick={e => this.decreaseStateNum(e, 'placesNum')}
                            className="personal-btn"
                            btnText={translate("button.title.delete")}
                            size='small'
                            type='no-brd'
                            icon='remove'
                            iconSize={11}
                            svg
                    />}
                </div>

                <Hr/>

                <FormItem>

                    {getFieldDecorator('category', {
                        rules: [{
                            required: true,
                            message: translate("auth.errors.inputCategory")
                        }],
                    })(
                        <SelectNew width ="100%"
                                   bubbleplaceholder={`* ${translate("auth.category")}`}
                                   className="step-form-item"
                                   data={category.map(el => translate(el))}
                                   onChange={(e)=>this.selectChangeHandler(e,"category")}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('categorydoc', {
                        rules: [{
                            required: this.state.isCategory,
                            message: translate("auth.errors.uploadConfirmingDoc")
                        }],
                    })(
                        <DropZoneUpload
                            uploadFile = {this.props.uploadFile}
                            text={translate("auth.addCategoryDocument")}
                        />
                    )}
                </FormItem>
                <Hr/>
                <FormItem>

                    {getFieldDecorator('experience', {
                        rules: [{
                            required: true,
                            message: translate("auth.errors.inputWorkExperience")
                        }],
                    })(
                        <InputNew width ="100%" bubbleplaceholder={`* ${translate("auth.workExperience")}`} className="step-form-item"/>

                    )}
                </FormItem>


                <div className="step-block-title">{translate("auth.additionalInfo")}</div>
                <Step2_additional getFieldDecorator={getFieldDecorator}
                                  langs={langs}
                                  payments={payments}
                                  selectorToolTip = {selectorToolTip}/>

                <div className="steps-action">
                    <Button onClick={this.handleGoBack}
                            btnText={translate("button.title.back")}
                            size='large'
                            type='float'
                            style = {{marginRight: "20px"}}
                    />
                    <Button htmlType="submit"
                            btnText={translate("button.title.next")}
                            size='large'
                            type='gradient'
                    />
                </div>
            </Form>
            )
        }
    </Translate>
        )
    }
}

const Step2 = Form.create({
    mapPropsToFields(props) {
        let fields ={};
        for (let key in props.data){
            if (key !== 'current' && props.data[key]){
                if(key.indexOf("ucationyears") + 1) {
                    if(props.data[key].defaultEndValue && props.data[key].defaultStartValue) {
                        fields[key] = Form.createFormField({
                            value: {defaultStartValue: props.data[key].defaultStartValue , defaultEndValue: props.data[key].defaultEndValue}
                        })
                    } else {
                        fields[key] = Form.createFormField({
                            value: {defaultStartValue: props.data[key][0] , defaultEndValue: props.data[key][1]}
                        })
                    }

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
