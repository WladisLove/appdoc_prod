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

    render() {
        let doctor = compileToClientDoctor(this.props.profileDoctor);
        let isUser = this.props.auth.mode === "user";
        return (
            <Hoc>
                {isUser ? (
                    <div className="patient-persoonal-items">
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PatientAccardionContact
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PatientAccardionDisease
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                    </div>) : (
                    <div className="doctor-persoonal-items">
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalContact
                                    profileDoctor={doctor}
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalEducation
                                    profileDoctor={doctor}
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalExperience
                                    profileDoctor={doctor}
                                    onSubmit={this.onSubmit}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} xxl={18}>
                                <PersonalInformation
                                    profileDoctor={doctor}
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
        auth: state.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
        onSendNewInfoDoctor: (info) => dispatch(actions.sendNewInfoDoctor(info))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
/*

export default PersonalInfo;*/
