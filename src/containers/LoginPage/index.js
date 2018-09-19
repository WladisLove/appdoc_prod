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
                this.setState({isRegFinished:true})
            }
        })
    };

    onOk = () => {
        this.setState({isRegFinished: false, regInProgress: false})

    };

    render(){

        const langs = ["Азербайджанский","Английский","Армянский","Белорусский","Испанский","Итальянский","Казахский","Киргизский","Китайский","Литовский","Молдавский","Немецкий","Польский","Русский","Таджикский","Узбекский","Французский"];
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

                <div className="loginPage-header">
                    <div className="loginPage-header-close">
                        <NavLink to="/login" onClick={this.onOk}>
                            <Icon type='close' svg />
                        </NavLink>

                    </div>
                </div>

                <Row style={{marginLeft: 0, marginRight: 0}}>
                    <Col xs={{span: 24}}
                         sm={{span: 22, offset: 1}}
                         md={{span: 18, offset: 3}}
                         lg={{span: 14, offset: 5}}
                         xl={{span: 12, offset: 6}}>
                        <Route path="/login"
                               exact
                               render={() => <Login urlForget={this.props.match.url + '/forget'}
                                                    urlRegistrationDoctor='/registration'
                                                    urlRegistrationPatient='/patient-registration'
                                                    errorCode={this.props.errorCode}
                                                    onSubmit={(obj) => this.props.onLogin(obj, this.props.history)}
                               />}
                        />
                        <Route path="/login/forget"
                               exact
                               render={() => <LoginForget urlLogin={this.props.match.url}
                                                          onUrlChange={() => {
                                                              this.props.history.replace(this.props.match.url)
                                                          }}/>}
                        />
                        <Route path="/registration"
                               exact
                               render={() => <Registration onFinish={this.registerDoctor}
                                                           langs={langs}
                                                           payments={payments}
                                                           category = {category}
                                                           academicTitle = {academicTitle}
                                                           academicDegree = {academicDegree}
                                                           finalText='Я ознакомлен с условиями работы и принимаю их'
                                                           urlLogin = "/login"
                                                           onOk={this.onOk}
                                                           isRegFinished = {this.state.isRegFinished}
                                                           regInProgress = {this.state.regInProgress}
                                                           onCheckEmailAvailability={this.props.onCheckEmailAvailability}
                                                           uploadFile = {this.props.uploadFile}
                               />}
                        />
                        <Route path="/patient-registration"
                               exact
                               render={() => <RegistrationPatient onFinish={this.registerPatient}
                                                                  langs={langs}
                                                                  urlLogin = "/login"
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
	}
};

const mapDispatchToProps = dispatch => {
	return {
        onLogin: ({userName, password, remember}, history) => dispatch(actions.login(userName, password, remember, history)),
        onRegisterUser: (userInfo) => dispatch(actions.registerUser(userInfo)),
        onRegisterDoctor: (docInfo) => dispatch(actions.registerDoctor(docInfo)),
        onCheckEmailAvailability: (email) => dispatch(actions.checkEmailAvailability(email)),
        reportBug: (message, href) => dispatch(actions.reportBug(message, href)),
        uploadFile: (file) => dispatch(actions.uploadFile(file))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
