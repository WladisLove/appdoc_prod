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
import {compileToClientPatient, compileToServerPatient} from './compilerPatient'
import PatientAccardionContact from "../../components/PatientAccardionContact";
import PatientAccardionDisease from "../../components/PatientAccardionDisease";

import { Translate } from 'react-localize-redux'


class PersonalInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        this.props.auth.mode === "user" ? this.props.onGetInfoPatient(this.props.auth.id) :

        this.props.onGetDoctorSpecialities(localStorage.getItem('lang'))
        this.props.onGetAvailLangs(localStorage.getItem('lang'))

        this.props.onGetInfoDoctor(this.props.auth.id)

    };

    onVisible = () => {
      this.setState({visible:false}) ;
    };

    onSubmit = (submitData) => {
        this.props.onSendNewInfoDoctor(submitData);
        this.setState({visible:true});
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
        let profile = isUser ? compileToClientPatient(this.props.profilePatient) : this.props.profileDoctor;
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
                                    onAddChronic = {this.props.onAddChronic}
                                    onDeleteChronic = {this.props.onDeleteChronic}
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
                                    uploadFile={this.props.uploadFile}
                                    docSpecialities={this.props.docSpecialities}
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
                                    langs={this.props.availLanguages}
                                />
                            </Col>
                        </Row>
                        <Translate>
                            {({ translate }) =>
                                (<WarningModal visible={this.state.visible} onClick={this.onVisible}
                                              message={translate('notifications.adminVerification')} />)
                            }
                        </Translate>
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
        docSpecialities: state.doctor.docSpecialities,
        availLanguages: state.doctor.availLanguages
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
        uploadFile: (file) => dispatch(actions.uploadFile(file)),
        onGetDoctorSpecialities: (lang) => dispatch(actions.getDoctorSpecialities(lang)),
        onGetAvailLangs: (lang) => dispatch(actions.getAvailLangs(lang)),
        onAddChronic: (disease) => dispatch(actions.addChronicDisease(disease)),
        onDeleteChronic: (id) => dispatch(actions.deleteChronicDisease(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
