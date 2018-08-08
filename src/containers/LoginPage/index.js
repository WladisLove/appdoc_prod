import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import {Route} from 'react-router-dom'
import Hoc from '../../hoc'
import Icon from "../../components/Icon/index.js";
import Row from "../../components/Row/index.js";
import Col from "../../components/Col/index.js";
import Login from "../../components/Login/index.js";
import LoginForget from "../../components/LoginForget/index.js";
import Registration from "../../components/Registration/index.js";
import RegistrationPatient from "../../components/RegistrationPatient/index.js";


import * as actions from '../../store/actions'
import './styles.css'

class LoginPage extends React.Component {
    

    closeAuthPage = (e) => {
        e.preventDefault();
        console.log('Close & go back')
    };



    render(){

        const langs = ["Русский", "Английский", "Немецкий"];
        const payments = [50,75,100,125,150];
        const academicTitle = ['Нет звания',
            'Кандидат медицинских наук',
            'Доктор медицинских наук'];
        const academicDegree = ['Нет степени',
            'Доцент',
            'Профессор'];
        const category = ['Без категории',
            'Первая категория',
            'Вторая категория',
            'Высшая категория'];


        return (
            <Hoc>
                <div className="loginPage-header">
                    <div className="loginPage-header-close">
                        <Icon type='close' svg onClick={this.closeAuthPage}/>
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
                               render={() => <Registration onFinish={docInfo => this.props.onRegisterDoctor(docInfo)}
                                                           langs={langs}
                                                           payments={payments}
                                                           category = {category}
                                                           academicTitle = {academicTitle}
                                                           academicDegree = {academicDegree}
                                                           finalText='to continue'
                               />}
                        />
                        <Route path="/patient-registration"
                               exact
                               render={() => <RegistrationPatient onFinish={obj => this.props.onRegisterUser(obj)}
                                                                  langs={langs}
                                                                  urlLogin = "/login"
                                                                  payments={payments}
                                                                  academicTitle={academicTitle}
                                                                  academicDegree={academicDegree}
                                                                  finalText='to continue'
                                                                  isUserExist={this.props.isUserExist}
                                                                  isRegFinished={this.props.isRegistrationFinished}
                                                                  isRegInProgress = {this.props.isRegInProgress}
                               />}
                        />
                    </Col>
                </Row>
            </Hoc>
        )
    }
    

}

const mapStateToProps = state => {
	return {
        errorCode: state.auth.errorCode,
        isRegInProgress: state.auth.isRegInProgress,
        isRegistrationFinished: state.auth.isRegistrationFinished,
        isUserExist: state.auth.isUserExist
	}
};

const mapDispatchToProps = dispatch => {
	return {
        onLogin: ({userName, password, remember}, history) => dispatch(actions.login(userName, password, remember, history)),
        onRegisterUser: (userInfo) => dispatch(actions.registerUser(userInfo)),
        onRegisterDoctor: (docInfo) => dispatch(actions.registerDoctor(docInfo))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);