import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import Select from '../Select'

import './style.css'
import '../../icon/style.css'
import {Form} from "antd/lib/index";
import addInfoObj from "../../helpers/addInfoObj";
import InputNew from "../InputNew";
import DropZoneUpload from "../DropZoneUpload";
import { Translate } from 'react-localize-redux'

const FormItem = Form.Item;
const Option = Select.Option;

class PersonalExperienceItemForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            experBlock: 0,
            experience: props.profileDoctor.experience || null,
            works: props.profileDoctor.works || [],
            category: {name: props.profileDoctor.category || "", doc: props.profileDoctor.copycontract || []}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err && this.state.experBlock === 0) {
                this.props.form.resetFields();
                this.setState({experBlock: 0});
                let toSubmitObj = {
                    works: this.state.works,
                    experience: this.state.experience,
                    category: this.state.category.name,
                    categorydoc: this.state.category.doc,
                    educationsgroup1: this.props.profileDoctor.educationsgroup1, // fix server bug
                    educationsgroup2: this.props.profileDoctor.educationsgroup2 // fix server bug
                };
                this.props.onSubmit(toSubmitObj);
            }
        });
    };

    addDp = () => { this.setState({experBlock: 1}) };

    renderDp = (getFieldDecorator) =>{
        let dpArr = [];

        if(this.state.experBlock === 1) {
            dpArr.push(
                <div className="personal-item" key={1}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                                <FormItem>
                                    {getFieldDecorator('work-worknow', {
                                        rules: [{
                                            required: true,
                                            message: translate(`personal.form.errors.input.work.current`)
                                        }],
                                    })(
                                        <InputNew width="100%" bubbleplaceholder={`* ${translate('personal.form.input.work.current')}`} className="step-form-item"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('work-adress', {
                                        rules: [{
                                            required: true,
                                            message: translate(`personal.form.errors.input.work.address`)
                                        }],
                                    })(
                                        <InputNew width ="100%" bubbleplaceholder={`* ${translate('personal.form.input.work.address')}`} className="step-form-item"/>
                                    )}
                                </FormItem>


                                <div className="step-row">
                                    <FormItem>
                                        {getFieldDecorator('work-post', {
                                            rules: [{
                                                required: true,
                                                message: translate(`personal.form.errors.input.work.position`)
                                            }],
                                        })(
                                            <InputNew width ="100%" bubbleplaceholder={`* ${translate('personal.form.input.work.position')}`} className="step-form-item"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('work-copycontract', {
                                            rules: [{
                                                required: true,
                                                message: translate(`personal.form.errors.uploadFile`)
                                            }],
                                        })(
                                            <DropZoneUpload
                                                uploadFile = {this.props.uploadFile}
                                                text={translate(`personal.form.uploadFile.contract`)}
                                            />
                                        )}
                                    </FormItem>

                                </div>
                                <div className="personal-item">
                                    <Button onClick={() => {
                                        this.props.form.validateFields((err, values) => {
                                            if (!err) {
                                                let newWorksEntry = {
                                                    worknow: values['work-worknow'],
                                                    adress: values['work-adress'],
                                                    post: values['work-post'],
                                                    copycontract: values['work-copycontract']
                                                };
                                                this.setState({
                                                    experBlock: 0,
                                                    works: [...this.state.works, newWorksEntry]
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
                <div className="personal-item" key={2}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                                <FormItem className="personal-item">
                                    {getFieldDecorator('changeCategoryField', {
                                        rules: [{
                                            required: true,
                                            message: translate(`personal.form.errors.select.workCategory`)
                                        }],
                                    })(
                                        <Select placeholder={translate(`personal.form.select.workCategory`)}>
                                            {addInfoObj.category.map((item) => <Option value={item}>{item}</Option>)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem className="personal-item" >
                                    {getFieldDecorator('uploadCategory', {
                                    })(
                                        <DropZoneUpload
                                            uploadFile={this.props.uploadFile}
                                            text={translate(`personal.form.uploadFile.category`)}
                                        />
                                    )}
                                </FormItem>
                                <div className="personal-item">
                                    <Button onClick={() => {
                                        this.props.form.validateFields((err, values) => {
                                            if (!err) {
                                                this.setState({
                                                    experBlock: 0,
                                                    category: {name: values['changeCategoryField'], doc: values['uploadCategory']}
                                                });
                                            }
                                        })
                                    }
                                    }
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

    addDp3 = () => {
        this.setState({experBlock: 3})
    };

    renderDp3 = (getFieldDecorator) => {
        let dpArr3 = [];
        if(this.state.experBlock === 3) {
            dpArr3.push(
                <div className="personal-item" key={3}>
                    <Translate>
                        {({ translate }) =>
                            (<div>
                                <FormItem className="personal-item">
                                    {getFieldDecorator('experience', {
                                        rules: [{
                                            required: true,
                                            message: translate(`personal.form.errors.input.experience`)
                                        }],
                                    })(
                                        <InputNew width ="100%" bubbleplaceholder={`* ${translate('personal.form.input.experience')}`} className="step-form-item"/>
                                    )}
                                </FormItem>
                                <div className="personal-item">
                                    <Button onClick={() => {
                                        this.props.form.validateFields((err, values) => {
                                            if (!err) {
                                                this.setState({
                                                    experBlock: 0,
                                                    experience: values.experience
                                                });
                                            }
                                        })
                                    }
                                    }
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

    componentWillReceiveProps(nextProps) {
        if (this.props.profileDoctor && JSON.stringify(nextProps.profileDoctor) !== JSON.stringify(this.props.profileDoctor)) {
            this.setState({
                experience: nextProps.profileDoctor.experience,
                works: nextProps.profileDoctor.works,
                category: {name: nextProps.profileDoctor.category, doc: nextProps.profileDoctor.copycontract}
            });
        }
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        const {experience, works, category} = this.state;

        let worksView = works.map((elem, i) => {
            return (
                <div key={elem.id} className="personal-item brd-b brd-d">
                    <div className="personal-info">
                        <div className="personal-info"><p><b>{elem.worknow}</b></p></div>
                        <div className="personal-info"><p>{elem.adress}</p></div>
                        <div className="personal-info"><p>{elem.post}</p></div>
                    </div>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            let newWorks = this.state.works;
                            newWorks.splice(i, 1);
                            this.setState({works: newWorks});
                        }}
                        className="personal-delete"
                        size='small'
                        type='blue-float'
                        icon='close'
                        iconSize={17}
                        svg
                    />
                </div>);
        });

        const rootClass = cn('personal-experience');

        return (
            <Form className={rootClass} onSubmit={this.handleSubmit}>
                <Translate>
                    {({ translate }) =>
                        (<div>
                            <div className="personal-block">
                                <div className="personal-item">
                                    <div className="personal-title"><Translate id={"personal.form.input.work.current"} /></div>
                                </div>

                                {worksView}

                                {this.state.experBlock !== 1 && <div className="personal-item">
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
                                <div className="personal-title"><Translate id={"personal.form.select.workCategory"} /></div>

                                <div className="personal-item mb-35">
                                    <div className="personal-info">{category.name}</div>

                                {this.state.experBlock !== 2 &&
                                    <Button onClick={this.addDp2}
                                            className="personal-edit"
                                            size='small'
                                            type='blue-float'
                                            icon='setting_edit'
                                            iconSize={17}
                                            svg
                                    />}
                                </div>
                                {this.renderDp2(getFieldDecorator)}
                            </div>

                            <div className="personal-block">
                                    <div className="personal-title"><Translate id={"personal.experience"} /></div>

                                <div className="personal-item mb-35">
                                <div className="personal-info">{experience}</div>

                                {this.state.experBlock !== 3 &&
                                    <Button onClick={this.addDp3}
                                            className="personal-edit"
                                            size='small'
                                            type='blue-float'
                                            icon='setting_edit'
                                            iconSize={17}
                                            svg
                                    />}
                                </div>
                                {this.renderDp3(getFieldDecorator)}
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

const PersonalExperienceItem  = Form.create()(PersonalExperienceItemForm);

PersonalExperienceItem.propTypes = {
    profileDoctor: PropTypes.object
};

PersonalExperienceItem.defaultProps = {
    profileDoctor: {}
};

export default PersonalExperienceItem
