import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import {NavLink, Route} from 'react-router-dom'
import Hoc from '../../hoc'
import Icon from "../../components/Icon/index.js";
import Row from "../../components/Row/index.js";
import Col from "../../components/Col/index.js";
import Login from "../../components/Login/index.js";
import { message } from 'antd';
import LoginForget from "../../components/LoginForget/index.js";
import Registration from "../../components/Registration/index.js";
import RegistrationPatient from "../../components/RegistrationPatient/index.js";
import addInfoObj from "../../helpers/addInfoObj"
import {Translate} from "react-localize-redux";


import * as actions from '../../store/actions'
import './styles.css'
import ReportBugModal from "../../components/ReportBugModal";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegFinished: false
        };
    }

    componentDidMount(){
        this.props.onGetDoctorSpecialities(localStorage.getItem('lang'));
        this.props.onGetSelectorToolTip();
        this.props.onGetAvailLangs(localStorage.getItem('lang'));
        this.props.onGetAvailProfs();
    }


    registerDoctor = (data) => {
        this.setState({regInProgress: true});
        this.props.onRegisterDoctor(data).then(res=> {
            if(res.data.code !== 200) {
                message.error('Заполнены не все обязательные поля', 4);
            } else {
                this.setState({isRegFinished:true})
            }
        })
    };
    registerPatient = (data) => {
        this.setState({regInProgress: true});
        this.props.onRegisterUser(data).then(res=> {
            if(res.data.code !== 200) {
                message.error('Заполнены не все обязательные поля', 4);
            } else {
                this.setState({isRegFinished:true});
                if(window.localStorage.getItem("tempAssigment")) {
                    const tempAssigment = JSON.parse(window.localStorage.getItem("tempAssigment"));
                    const reception = {
                        type: tempAssigment.type,
                        file: [{"fileLink": "media/"+tempAssigment.tempUploadfile}],
                        comment: tempAssigment["appointment-comment"],
                        date: tempAssigment.timestamp,
                        id_doc: tempAssigment.doctorId,
                    };
                    const userID = +res.data.result.id;

                    this.props.onSaveReceptionByPatient(reception, userID)
                        .then(() => window.localStorage.setItem("tempAssigment", ""));
                }
            }
        })
    };



    onOk = () => {
        this.setState({isRegFinished: false, regInProgress: false})

    };

    render(){
        const payments = addInfoObj.payments;
        const academicTitle = addInfoObj.title ;
        const academicDegree = addInfoObj.degree ;
        const category = addInfoObj.category;

        return (
            <Hoc>

                <div className="loginPage-header">
                    <a href='https://appdoc.by'><div className="logo"><span className="logo-img"></span></div></a>
                    {this.props.match.path !== "/app/login" &&
                    <div className="loginPage-header-close">
                            <NavLink to="/app/login" onClick={this.onOk}>
                                <Icon type='close' svg />
                            </NavLink>
                    </div>
                    }
                </div>

                <Row style={{marginLeft: 0, marginRight: 0}}>
                    <Col xs={{span: 12, offset: 6}}
                         sm={{span: 12, offset: 6}}
                         md={{span: 12, offset: 6}}
                         lg={{span: 12, offset: 6}}
                         xl={{span: 12, offset: 6}}>
                        <Route path="/app/login"
                               exact
                               render={() => <Login urlForget={this.props.match.url + '/forget'}
                                                    urlRegistrationDoctor='/app/registration'
                                                    urlRegistrationPatient='/app/patient-registration'
                                                    errorCode={this.props.errorCode}
                                                    onSubmit={(obj) => this.props.onLogin(obj, this.props.history)}
                               />}
                        />
                        <Route path="/app/login/forget"
                               exact
                               render={() => <LoginForget urlLogin={this.props.match.url}
                                                          onUrlChange={() => {
                                                              this.props.history.replace(this.props.match.url)
                                                          }}/>}
                        />
                        <Route path="/app/registration"
                               exact
                               render={() => <Registration onFinish={this.registerDoctor}
                                                           langs={this.props.availLanguages}
                                                           payments={payments}
                                                           category = {category}
                                                           academicTitle = {academicTitle}
                                                           academicDegree = {academicDegree}
                                                           finalText={<Translate id={"auth.termsAndConditions"}/>}
                                                           urlLogin = "/app/login"
                                                           onOk={this.onOk}
                                                           isRegFinished = {this.state.isRegFinished}
                                                           regInProgress = {this.state.regInProgress}
                                                           onCheckEmailAvailability={this.props.onCheckEmailAvailability}
                                                           uploadFile = {this.props.uploadFile}
                                                           docSpecialities = {this.props.docSpecialities}
                                                           selectorToolTip = {this.props.selectorToolTip}
                                                           availableProfs = {this.props.availableProfs}
                               />}
                        />
                        <Route path="/app/patient-registration"
                               exact
                               render={() => <RegistrationPatient onFinish={this.registerPatient}
                                                                  langs={this.props.availLanguages}
                                                                  urlLogin = "/app/login"
                                                                  payments={payments}
                                                                  academicTitle={academicTitle}
                                                                  academicDegree={academicDegree}
                                                                  finalText='to continue'
                                                                  isRegFinished={this.state.isRegFinished}
                                                                  isRegInProgress={this.state.regInProgress}
                                                                  checkEmailAvailability={this.props.onCheckEmailAvailability}
                                                                  onOk={this.onOk}
                               />}
                        />
                    </Col>
                </Row>
                <button id="bugfix" onClick={()=>this.setState({bugfixVisible: true})}></button>
                <ReportBugModal
                    visible={this.state.bugfixVisible}
                    onCancel={()=>this.setState({bugfixVisible: false})}
                    onSend={this.props.reportBug}
                />
            </Hoc>
        )
    }


}

const mapStateToProps = state => {
	return {
        errorCode: state.auth.errorCode,
        docSpecialities: state.doctor.docSpecialities,
        availLanguages: state.doctor.availLanguages,
        availableProfs: state.profileDoctor.availableProfs,
        selectorToolTip: state.auth.selectorToolTip
	}
};

const mapDispatchToProps = dispatch => {
	return {
        onLogin: ({userName, password, remember}, history) => dispatch(actions.login(userName, password, remember, history)),
        onRegisterUser: (userInfo) => dispatch(actions.registerUser(userInfo)),
        onRegisterDoctor: (docInfo) => dispatch(actions.registerDoctor(docInfo)),
        onCheckEmailAvailability: (email) => dispatch(actions.checkEmailAvailability(email)),
        onGetDoctorSpecialities: (lang) => dispatch(actions.getDoctorSpecialities(lang)),
        onGetAvailLangs: (lang) => dispatch(actions.getAvailLangs(lang)),
        onGetAvailProfs: () => dispatch(actions.getAvailProfs()),
        onGetSelectorToolTip: () => dispatch(actions.getSelectorToolTip()),
        reportBug: (message, href) => dispatch(actions.reportBug(message, href)),
        uploadFile: (file) => dispatch(actions.uploadFile(file)),
        onSaveReceptionByPatient: (reception, userId) => dispatch(actions.setReceptionByPatient(reception, userId)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
