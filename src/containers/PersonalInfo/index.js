import React from 'react'
import {Row, Col, PersonalContact,PersonalEducation,PersonalExperience,PersonalInformation, WarningModal, PatientAccardionContact, PatientAccardionDisease} from "appdoc-component"

import Hoc from '../../hoc'
import './styles.css'
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import{compileToClientDoctor, compileToServerDoctor} from './compilerDoc'
import{compileToClientPatient, compileToServerPatient} from './compilerPatient'

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
        this.props.onSendNewInfoPatient(profilePatient);
        this.setState({visible:true}) ;
    };

    render() {
        let isUser = this.props.auth.mode === "user";
        let profile = isUser ? compileToClientPatient(this.props.profilePatient) : compileToClientDoctor(this.props.profileDoctor);
        return (
            <Hoc>
                {isUser ? (
                    <div className="patient-persoonal-items">
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PatientAccardionContact
                                    onSubmit={this.onSubmitPatient}
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
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalEducation
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalExperience
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalInformation
                                    profileDoctor={profile}
                                    onSubmit={this.onSubmit}
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
/*

export default PersonalInfo;*/
