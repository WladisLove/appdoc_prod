import React from 'react'
import Row from "../../components/Row";
import Col from "../../components/Col";
import PersonalContact from "../../components/PersonalContact";
import PersonalEducation from "../../components/PersonalEducation";
import PersonalExperience from "../../components/PersonalExperience";
import PersonalInformation from "../../components/PersonalInformation";
import WarningModal from "../../components/WarningModal";

import Hoc from '../../hoc'
import './styles.css'
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import{compileToClientDoctor, compileToServerDoctor} from './compilerDoc'
import{compileToClientPatient, compileToServerPatient} from './compilerPatient'
import PatientAccardionContact from "../../components/PatientAccardionContact";
import PatientAccardionDisease from "../../components/PatientAccardionDisease";

class PersonalInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        this.props.auth.mode === "user" ? this.props.onGetInfoPatient(this.props.auth.id) :
        this.props.onGetInfoDoctor(this.props.auth.id);
    };

    onVisible = () => {
      this.setState({visible:false}) ;
    };

    onSubmit = (profileDoctor) => {
        profileDoctor = compileToServerDoctor(profileDoctor);
        this.props.onSendNewInfoDoctor(profileDoctor);
        this.setState({visible:true}) ;
    };

    onSubmitPatient = (profilePatient) => {
        profilePatient = compileToServerPatient(profilePatient, this.props.auth.id);
        return this.props.onSendNewInfoPatient(profilePatient);
    };

    onSubmitPasswordPatient = (oldPass, newPass) => {
        return this.props.onSendNewPasswordPatient(oldPass, newPass, this.props.auth.id);
    };

    render() {
        let isUser = this.props.auth.mode === "user";
        let profile = isUser ? compileToClientPatient(this.props.profilePatient) : compileToClientDoctor(this.props.profileDoctor);
        const langs = ["Азербайджанский","Английский","Армянский","Белорусский","Испанский","Итальянский","Казахский","Киргизский","Китайский","Литовский","Молдавский","Немецкий","Польский","Русский","Таджикский","Узбекский","Украинский","Французский"];
        const payments = [10,20,30,40,50,75,100,200];
        const academicTitle = ['Нет звания',
            'Доцент',
            'Профессор'];
        const academicDegree = ['Нет степени',
            'Кандидат медицинских наук',
            'Доктор медицинских наук'];
        const category = ['Без категории',
            'Первая категория',
            'Вторая категория',
            'Высшая категория'];
        return (
            <Hoc>
                {isUser ? (
                    <div className="patient-persoonal-items">
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PatientAccardionContact
                                    onSubmit={this.onSubmitPatient}
                                    onSubmitPassword={this.onSubmitPasswordPatient}
                                    onDeleteAvatar={this.props.onDeleteAvatar}
                                    profile = {profile}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PatientAccardionDisease
                                    diseases = {profile.chronic}
                                />
                            </Col>
                        </Row>
                    </div>) : (
                    <div className="doctor-persoonal-items">
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalContact
                                    onSubmitPassword={this.onSubmitPasswordPatient}
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
                                    onDeleteAvatar={this.props.onDeleteAvatar}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalEducation
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
                                    academicTitle={academicTitle}
                                    academicDegree={academicDegree}
                                    uploadFile={this.props.uploadFile}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalExperience
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
                                    uploadFile={this.props.uploadFile}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalInformation
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
                                    payments={payments}
                                    langs={langs}
                                />
                            </Col>
                        </Row>
                        <WarningModal visible={this.state.visible} onClick={this.onVisible}
                                      message="Изменения всупят в силу после проверки администратором"/>
                    </div>)}
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        profileDoctor: state.profileDoctor,
        profilePatient: state.profilePatient,
        auth: state.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
        onSendNewInfoDoctor: (info) => dispatch(actions.sendNewInfoDoctor(info)),
        onGetInfoPatient: (id) => dispatch(actions.getInfoPatient(id)),
        onSendNewInfoPatient: (info) => dispatch(actions.sendNewInfoPatient(info)),
        onSendNewPasswordPatient: (oldPass, newPass, id) => dispatch(actions.sendNewPasswordPatient(oldPass, newPass, id)),
        onDeleteAvatar: (id) => dispatch(actions.deleteAvatar(id)),
        uploadFile: (file) => dispatch(actions.uploadFile(file))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
/*

export default PersonalInfo;*/
