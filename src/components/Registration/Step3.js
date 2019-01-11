import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import Hoc from '../Hoc'
import Checkbox from '../Checkbox'
import Button from '../Button'
import Hr from "../Hr";
import Spinner from "../Spinner";
import {Translate} from "react-localize-redux";

class Step3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: false,
        }
    }

    renderItem = (title, key) => {
        return (<div className='check-row' key={key}>
                    <div className='check-title'>{title}:</div>
                    <div className='check-text'>{this.props.data[key]}</div>
                </div>)
    };
    renderTimeItem = (title, key) => {
        return (<div className='check-row' key={key}>
            <div className='check-title'>{title}:</div>
            <div className='check-text'>{moment(this.props.data[key]).format('DD.MM.YYYY')}</div>
        </div>)
    };
    renderYesNoItem = (title, value) => {
        return (<div className='check-row'>
            <div className='check-title'>{title}:</div>
            <div className='check-text'>{value ? <Translate id={"yes"}/> : <Translate id={"no"}/>}</div>
        </div>)
    };

    renderEducInfo = (data) => {
        let i = 0,
            elArr = [];
        while (true){
            if(data['educationsgroup1-education-'+i]){
                elArr.push(<Hoc key={'educInfo'+i}>
                    {this.renderItem(<Translate id={"auth.universityName"}/>,'educationsgroup1-education-'+i)}
                    {this.renderItem(<Translate id={"auth.qualification"}/>,'educationsgroup1-speciality-'+i)}
                    {this.renderItem(<Translate id={"auth.graduationYear"}/>,'educationsgroup1-finishucationyear-'+i)}
                    <Hr/>
                </Hoc>)
            }
            else {
                return elArr;
            }
            i++
        }
    };
    renderWorkInfo = (data) => {
            let i = 0,
                elArr = [];
            while (true){
                if(data['work-worknow-'+i]){
                    elArr.push(<Hoc key={'workInfo'+i}>
                        {this.renderItem(<Translate id={"auth.currentWorkPlace"}/>,'work-worknow-'+i)}
                        {this.renderItem(<Translate id={"auth.workAddress"}/>,'work-adress-'+i)}
                        {this.renderItem(<Translate id={"auth.position"}/>,'work-post-'+i)}
                        <Hr/>
                    </Hoc>)
                }
                else {
                    return elArr;
                }
                i++
            }
        };

    renderGraduateEducInfo = (data) => {
        let i = 0,
            elArr = [];
        while (true){
            let datepicker = data['educationsgroup2-ucationyears-'+i];
            if(data['educationsgroup2-education-'+i]
                || data['educationsgroup2-ciklname-'+i]
                || ( datepicker && datepicker [0] && datepicker[1])){

                let institution = data['educationsgroup2-education-'+i],
                    educCycle = data['educationsgroup2-ciklname-'+i],
                    educPeriod = data['educationsgroup2-ucationyears-'+i];
                elArr.push(<Hoc key={'graduateEducInfo'+i}>
                    {institution &&
                    <div className='check-row'>
                        <div className='check-title'>
                            <Translate id={"auth.universityName"}/>:</div>
                        <div className='check-text'>{institution}</div>
                    </div>}
                    {educCycle &&
                    <div className='check-row'>
                        <div className='check-title'>
                            <Translate id={"auth.courseName"}/>:</div>
                        <div className='check-text'>{educCycle}</div>
                    </div>}
                    {educPeriod &&
                    <div className='check-row'>
                        <div className='check-title'><Translate id={"auth.coursePeriod"}/>:</div>
                        <div className='check-text'>
                            {
                                moment(educPeriod[0]).format('DD.MM.YYYY')
                            } - {
                                moment(educPeriod[1]).format('DD.MM.YYYY')
                            }
                        </div>
                    </div>}
                    <Hr/>
                </Hoc>)
            }
            else {
                return elArr;
            }
            i++
        }
    };

    renderAdditionalInfo = (data) => {
        let langs = data['langs'],
            isChildConsult = data['isChildConsult'],
            consultPayment = data['consultPayment'],
            isFreeConsult = data['isFreeConsult'];
        return (<Hoc>
            {langs &&
            <div className='check-row'>rea
                <div className='check-title'><Translate id={"auth.langSkills"}/>:</div>
                <div className='check-text'>{langs.map(el => {
                    return (<div key={el}>{el} </div>)
                })}</div>
            </div>}
            {isChildConsult &&
                this.renderYesNoItem(<Translate id={"auth.langSkills"}/>, isChildConsult)}
            {consultPayment &&
            <div className='check-row'>
                <div className='check-title'><Translate id={"auth.paymentAmount"}/>:</div>
                <div className='check-text'>
                    {consultPayment}
                </div>
            </div>}
            {isFreeConsult &&
                this.renderYesNoItem(<Translate id={"auth.freeConsult"}/>, isFreeConsult)}
        </Hoc>)
    };

    finishHandler = () => {
        let data = this.props.data;
        for (let key in data) {
            if (!data[key]) {
                delete data[key]
            }

        }
        this.props.onFinish(data);
    };

    handleGoBack = () => {
        this.props.onPrev();
    };

    render() {
        const {data} = this.props;
        return (
            <Translate>
                {({translate}) =>
                    (
                        <div className="step-form">
                            <div className="step-posttitle">{translate("auth.checkEnteredData")}</div>


                            {this.renderItem(translate("auth.fullName"), 'fio')}
                            {this.renderItem('E-mail', 'email')}
                            {this.renderItem(translate("auth.phone"), 'phone')}
                            <div className='check-row'>
                                <div className='check-title'>{translate("auth.gender")}</div>
                                <div className='check-text'>
                                    {data.sex === 'm' ? translate("auth.male") : translate("auth.female")}
                                </div>
                            </div>
                            {this.renderTimeItem(translate("auth.birthday"), 'datebirth')}
                            <Hr/>
                            {this.renderEducInfo(data)}

                            {this.renderGraduateEducInfo(data)}
                            {this.renderWorkInfo(data)}

                            {data.category && this.renderItem(translate("auth.category"), 'category')}
                            {data.academicdegree && this.renderItem(translate("auth.academicDegree"), 'academicdegree')}
                            {data.academicstatus && this.renderItem(translate("auth.academicTitle"), 'academicstatus')}
                            {data.experience && this.renderItem(translate("auth.workExperience"), 'experience')}


                            {this.renderAdditionalInfo(data)}
                            {data.about && this.renderItem(translate("auth.aboutMyself"), 'about')}
                            <Checkbox checked={this.state.checked}
                                      style={{marginTop: "20px"}}
                                      onChange={(e) => this.setState({checked: e.target.checked})}>
                                {this.props.finalText}
                            </Checkbox>

                            <div className="steps-action">
                                <Button onClick={this.handleGoBack}
                                        btnText={translate("button.title.back")}
                                        disable={this.props.regInProgress}
                                        size='large'
                                        type='float'
                                        style={{marginRight: "20px"}}
                                />
                                <Button btnText={translate("button.title.complete")}
                                        disable={!this.state.checked || this.props.regInProgress}
                                        onClick={this.finishHandler}
                                        size='large'
                                        type='gradient'
                                />
                            </div>
                            {this.props.regInProgress && <Spinner/>}
                        </div>)
                }
            </Translate>
        )
    }
}

Step3.propTypes = {
    data: PropTypes.object,
    onFinish: PropTypes.func,
};

Step3.defaultProps = {
    data: {},
    onFinish: () => {}
};

export default Step3
