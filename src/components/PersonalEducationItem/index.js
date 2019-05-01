import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import { Form } from 'antd'
import Button from '../Button'
import Upload from '../Upload'
import Select from '../Select'
import DatePicker from '../DatePicker'
import Input from '../Input'
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'
import InputNew from "../InputNew";
import SelectNew from "../SelectNew";
import DropZoneUpload from "../DropZoneUpload";
import RangeDPNew from "../RangeDPNew";
import moment from "moment";
import addInfoObj from "../../helpers/addInfoObj";

const FormItem = Form.Item;
const Option = Select.Option;

class PersonalEducationItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            educatBlock : 0,
            idCurrentDegree : null,
            mainEducationArr: props.profileDoctor.educationsgroup1 || [],
            secondEducationArr: props.profileDoctor.educationsgroup2 || [],
            degree: {name: props.profileDoctor.academicdegree || "", doc: []},
            status: {name: props.profileDoctor.academicstatus || "", doc: []}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFields((err) => {
            if (!err && this.state.educatBlock === 0) {
                this.props.form.resetFields();
                this.setState({educatBlock: 0});

                let mainEducation = [];
                this.state.mainEducationArr.forEach((el,i) => {
                        mainEducation.push({...el})
                        el.speciality.forEach((elem, index) => {
                            mainEducation[i].speciality[index] = elem.id
                        })
                })

                let toSubmitObj = {
                    educationsgroup1: mainEducation,
                    educationsgroup2: this.state.secondEducationArr,
                    academicdegree: this.state.degree.name,
                    academicdegreedoc: this.state.degree.doc,
                    academicstatus: this.state.status.name,
                    academicstatusdoc: this.state.status.doc,
                    works: this.props.profileDoctor.works // fix server bug
                };

                this.props.onSubmit(toSubmitObj);
            }
        });
    };

    validateYears = (rule, value, cb) => {

        if( (this.state.isName || this.state.isCycle || this.state.isDate || this.state.isFile) && !this.state.isDate) {
            cb(<Translate id={"personal.periodStudy"}/>)
        }
        if((value && value[0] && value[1]) || (value && !value[0] && !value[1]) || !value) {
            cb()
        } else cb(<Translate id={"personal.periodStudy"}/>)
    };

    addDp = () => {
        this.setState({educatBlock: 1})
    };

    renderDp = (getFieldDecorator) => {
        const specs = this.props.docSpecialities;
        let dpArr = [];


        if(this.state.educatBlock === 1)
            dpArr.push(
                <div className="personal-item" key={1}>
                  <Translate>
                        {({ translate }) =>
                            (<div>
                                <FormItem>
                                    {getFieldDecorator('educationsgroup1-education', {
                                        rules: [{
                                            required: true,
                                            message: translate('personal.form.errors.input.educationalInstitution')
                                        }],
                                    })(
                                        <InputNew width ="100%" bubbleplaceholder={`* ${translate('personal.form.input.educationalInstitution')}`} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('educationsgroup1-speciality', {
                                        rules: [{
                                            required: true,
                                            message: translate('personal.form.errors.select.qualification')
                                        }],
                                    })(
                                        <SelectNew width ="100%"
                                                   bubbleplaceholder={translate('personal.form.select.qualification')}
                                                   mode="multiple"
                                                   data={specs}
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('educationsgroup1-finishucationyear', {
                                        rules: [{
                                            required: true,
                                            message: translate('personal.form.errors.input.finisheducationyear'),

                                        },{
                                            pattern: /^[ ]*[0-9]{4}[ ]*$/,
                                            message: translate('personal.form.errors.input.wrongFinisheducationyear')
                                        }],
                                    })(
                                        <InputNew width ="100%" bubbleplaceholder={translate('personal.form.input.finisheducationyear')} />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('educationsgroup1-diplomphoto', {
                                        rules: [{
                                            required: true,
                                            message: translate(`personal.form.errors.uploadFile`)
                                        }],
                                    })(
                                        <DropZoneUpload
                                            uploadFile = {this.props.uploadFile}
                                            text={translate(`personal.form.uploadFile.diplom`)}
                                        />
                                    )}
                                </FormItem>
                                <Button onClick={() => {
                                    this.props.form.validateFields((err, values) => {
                                        let specs = [];
                                    this.props.docSpecialities.forEach((el) => {
                                        values['educationsgroup1-speciality'].includes(el.id) ? specs.push(el) : null
                                    })

                                    let newEducationEntry = {
                                        education: values['educationsgroup1-education'],
                                        speciality: specs,
                                        finishucationyear: values['educationsgroup1-finishucationyear'],
                                        diplomphoto: values['educationsgroup1-diplomphoto']
                                    };

                                   
                                    this.setState({
                                        educatBlock: 0,
                                        mainEducationArr: [...this.state.mainEducationArr, newEducationEntry]
                                    });
                                }}
                                        className="personal-btn"
                                        btnText={translate(`button.title.done`)}
                                        size='small'
                                        type='no-brd'
                                        icon=''
                                        iconSize={11}
                                        svg
                                />
                            </div>)
                        }
                    </Translate>
                </div>
            );
        return (<div className="new-d">{dpArr}</div>);
    };

    addDp2 = () => {
        this.setState({educatBlock:2})
    };

    renderDp2 = (getFieldDecorator) => {
        let dpArr2 = [];

        if (this.state.educatBlock === 2) {
            dpArr2.push(
                <div className="personal-item" key={2}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                                <div className="step-block">
                                    <FormItem>
                                        {getFieldDecorator('educationsgroup2-education', {
                                            rules: [{
                                                required: true,
                                                message: translate(`personal.form.errors.input.educationalInstitution`)
                                            }],
                                        })(
                                            <InputNew width="100%" bubbleplaceholder={translate(`personal.form.input.educationalInstitution`)} className="step-form-item"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('educationsgroup2-ciklname', {
                                            rules: [{
                                                required: true,
                                                message: translate(`personal.form.errors.input.learningCurve`)
                                            }],
                                        })(
                                            <InputNew width="100%" bubbleplaceholder={translate(`personal.form.input.learningCurve`)} className="step-form-item"/>
                                        )}
                                    </FormItem>
                                    <div className="step-row">
                                        <FormItem>
                                            {getFieldDecorator('educationsgroup2-ucationyears', {
                                                valuePropName: 'rangeSet',
                                                rules: [{
                                                    validator: this.validateYears
                                                }],
                                            })(
                                                <RangeDPNew/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('educationsgroup2-diplomphoto', {
                                                rules: [{
                                                    required: true,
                                                    message: translate(`personal.form.errors.uploadFile`)
                                                }],
                                            })(
                                                <DropZoneUpload
                                                    uploadFile={this.props.uploadFile}
                                                    text={translate(`personal.form.uploadFile.diplom`)}
                                                />
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="personal-item">
                                    <Button onClick={() => {
                                        this.props.form.validateFields((err, values) => {
                                            if (!err) {
                                                let newEducationEntry = {
                                                    education: values['educationsgroup2-education'],
                                                    ciklname: values['educationsgroup2-ciklname'],
                                                    ucationyears: [
                                                        Math.ceil(moment(values['educationsgroup2-ucationyears'][0]).format('x') / 1000).toString(),
                                                        Math.ceil(moment(values['educationsgroup2-ucationyears'][1]).format('x') / 1000).toString()
                                                    ],
                                                    diplomphoto: values['educationsgroup2-diplomphoto']
                                                };
                                                this.setState({
                                                    educatBlock: 0,
                                                    secondEducationArr: [...this.state.secondEducationArr, newEducationEntry]
                                                });
                                            }
                                        });
                                    }}
                                            className="personal-btn"
                                            btnText={translate(`button.title.done`)}
                                            size='small'
                                            type='no-brd'
                                            icon=''
                                            iconSize={11}
                                            svg
                                    />
                                </div>
                            </div>)
                        }
                    </Translate>
                </div>
            )
        }
        return (
            <div className="new-d">
                {dpArr2}
            </div>
        );
    };

    addDp3 = (id) => {
        this.setState({educatBlock:3, idCurrentDegree: id})
    };

    renderDp3 = (getFieldDecorator) =>{
        let dpArr3 = [];
        if(this.state.educatBlock === 3) {
            dpArr3.push(
                <div className="personal-item" key={3}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                                <FormItem className="personal-item">
                                    {getFieldDecorator('changeDegreeField', {
                                        rules: [{
                                            required: true,
                                            message: translate(`personal.form.errors.select.academicDegree`)
                                        }],
                                    })(
                                        <Select placeholder={translate(`personal.form.select.academicDegree`)}>
                                            {addInfoObj.degree.map((item) => <Option value={item}>{translate(item)}</Option>)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem className="personal-item" >
                                    {getFieldDecorator('uploadDegree', {
                                    })(
                                        <DropZoneUpload
                                            uploadFile={this.props.uploadFile}
                                            text={translate(`personal.form.uploadFile.academicDegree`)}
                                        />
                                    )}
                                </FormItem>
                                <div className="personal-item">
                                    <Button onClick={() => {
                                        this.props.form.validateFields((err, values) => {
                                            if (!err) {
                                                this.setState({
                                                    educatBlock: 0,
                                                    degree: {name: values['changeDegreeField'], doc: values['uploadDegree']}
                                                });
                                            }
                                        });
                                    }}
                                            className="personal-btn"
                                            btnText={translate(`button.title.done`)}
                                            size='small'
                                            type='no-brd'
                                            icon=''
                                            iconSize={11}
                                            svg
                                    />
                                </div>
                            </div>)
                        }
                    </Translate>
                </div>
            )
        }
        return (
            <div className="new-d">
                {dpArr3}
            </div>
            );
    };

    addDp4 = (id) => {
        this.setState({educatBlock:4, idCurrentDegree: id})
    };

    renderDp4 = (getFieldDecorator) =>{
        let dpArr4 = [];
        if(this.state.educatBlock === 4) {
            dpArr4.push(
                <div className="personal-item" key={4}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                                <FormItem className="personal-item">
                                    {getFieldDecorator('changeStatusField', {
                                        rules: [{
                                            required: true,
                                            message: translate(`personal.form.errors.select.academicRank`)
                                        }],
                                    })(
                                        <Select placeholder={translate(`personal.form.select.academicRank`)}>
                                            {addInfoObj.title.map((item) => <Option value={item}>{translate(item)}</Option>)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem className="personal-item" >
                                    {getFieldDecorator('uploadStatus', {
                                    })(
                                        <DropZoneUpload
                                            uploadFile={this.props.uploadFile} uploadFile
                                            text={translate(`personal.form.uploadFile.academicRank`)}
                                        />
                                    )}
                                </FormItem>
                                <div className="personal-item">
                                    <Button onClick={() => {
                                        this.props.form.validateFields((err, values) => {
                                            if (!err) {
                                                this.setState({
                                                    educatBlock: 0,
                                                    status: {name: values['changeStatusField'], doc: values['uploadStatus']}
                                                });
                                            }
                                        });
                                    }}
                                            className="personal-btn"
                                            btnText={translate(`button.title.done`)}
                                            size='small'
                                            type='no-brd'
                                            icon=''
                                            iconSize={11}
                                            svg
                                    />
                                </div>
                            </div>)
                        }
                    </Translate>
                </div>
            )
        }
        return (
            <div className="new-d">
                {dpArr4}
            </div>
        );
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.profileDoctor && JSON.stringify(nextProps.profileDoctor) !== JSON.stringify(this.props.profileDoctor)) {
            
            this.setState({
                mainEducationArr: nextProps.profileDoctor.educationsgroup1,
                secondEducationArr: nextProps.profileDoctor.educationsgroup2,
                degree: {name: nextProps.profileDoctor.academicdegree, doc: []},
                status: {name: nextProps.profileDoctor.academicstatus, doc: []}
            });
        }
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const {mainEducationArr, secondEducationArr, degree, status} = this.state;
        const rootClass = cn('personal-education');

        const institution = mainEducationArr.map((elem, i) => {
        
            mainEducationArr[i].id = "mainEducation" + i;

            return (
                <div key={"mainEducation" + i} className="personal-item mb-35 brd-b brd-d">
                    <div className="personal-info">
                        <p>
                            {elem.education}, {elem.finishucationyear}
                        </p>
                    </div>
                    <div className="personal-info">
                        <p>
                            {elem.speciality.map((el) => el instanceof Object ? el.title : el).join(', ')}
                        </p> 
                    </div>

                </div> );
        });
        const institutionSecond = secondEducationArr.map((elem, i) => {
            secondEducationArr[i].id = "mainEducation" + i;
            return (
                <div key={"secondEducation" + i} className="personal-item pb-25 mb-35 brd-b brd-d">
                    <div className="personal-info">
                        <p>
                            {elem.education}, {moment(elem.ucationyears[0] * 1000).format('MMMM YYYY')} - {moment(elem.ucationyears[1] * 1000).format('MMMM YYYY')}
                        </p>
                    </div>
                    <div className="personal-info">
                        <p>
                            {elem.ciklname}
                        </p>
                    </div>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        let newSecondEducationArr = this.state.secondEducationArr;
                        newSecondEducationArr.splice(i, 1);
                        this.setState({secondEducationArr: newSecondEducationArr});
                    }
                    }
                            className="personal-edit"
                            size='small'
                            type='blue-float'
                            icon='close'
                            iconSize={17}
                            svg
                    />
                </div> );
        });

        const institutionDegree = (
                <div className="personal-item mb-35">
                    <div className="personal-info">{degree.name}</div>
                    {this.state.educatBlock !== 3 && <Button onClick={this.addDp3}
                            className="personal-edit"
                            size='small'
                            type='blue-float'
                            icon='setting_edit'
                            iconSize={17}
                            svg
                    />}
                </div>
        );

        const institutionStatus = (
            <div className="personal-item mb-35">
                <div className="personal-info">{status.name}</div>
                {this.state.educatBlock !== 4 && <Button onClick={this.addDp4}
                        className="personal-edit"
                        size='small'
                        type='blue-float'
                        icon='setting_edit'
                        iconSize={17}
                        svg
                />}
            </div>
        );

        return (
                <Form className={rootClass} onSubmit={this.handleSubmit}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                                <div className="personal-block">
                                    <div className="personal-item">
                                        <div className="personal-title">{translate(`personal.education.basic`)}</div>
                                    </div>

                                    {institution}

                                    {this.state.educatBlock !== 1 && <div className="personal-item">
                                         <Button onClick={this.addDp}
                                            className="personal-btn"
                                            btnText={translate(`button.title.add`)}
                                            size='small'
                                            type='no-brd'
                                            icon='plus'
                                            iconSize={11}
                                            svg
                                        />
                                    </div>}
                                    {this.renderDp(getFieldDecorator)}
                                </div>

                                <div className="personal-block">
                                    <div className="personal-item">
                                        <div className="personal-title">{translate(`personal.education.postgraduate`)}</div>
                                    </div>
                                    {institutionSecond}

                                    {this.state.educatBlock !== 2 && <div className="personal-item">
                                         <Button onClick={this.addDp2}
                                         className="personal-btn"
                                            btnText={translate(`button.title.add`)}
                                            size='small'
                                            type='no-brd'
                                            icon='plus'
                                            iconSize={11}
                                            svg
                                        />
                                    </div>}
                                    {this.renderDp2(getFieldDecorator)}
                                </div>

                                <div className="personal-block">
                                    <div className="personal-item">
                                        <div className="personal-title">{translate(`personal.form.select.academicDegree`)}</div>
                                    </div>
                                    {institutionDegree}
                                    {this.renderDp3(getFieldDecorator)}
                                </div>

                                <div className="personal-block">
                                    <div className="personal-item">
                                        <div className="personal-title">{translate(`personal.form.select.academicRank`)}</div>
                                    </div>
                                    {institutionStatus}
                                    {this.renderDp4(getFieldDecorator)}
                                </div>

                                <div className="personal-block">
                                    <Button
                                        htmlType="submit"
                                        btnText={translate(`button.title.saveChanges`)}
                                        size='default'
                                        type='float'
                                    />
                                </div>
                            </div>)
                        }
                    </Translate>
                </Form>
        )
    }
}

const PersonalEducationItem  = Form.create()(PersonalEducationItemForm);

PersonalEducationItem.propTypes = {
    profileDoctor: PropTypes.object
};

PersonalEducationItem.defaultProps = {
    profileDoctor: {}
};

export default PersonalEducationItem
