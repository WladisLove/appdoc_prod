import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux';


import {Route} from 'react-router-dom'
import Hoc from '../../hoc'

import {
    Icon, Row, Col,
    Login, LoginForget, Registration
} from 'appdoc-component'


import * as actions from '../../store/actions'
import './styles.css'

class LoginPage extends React.Component {
    

    closeAuthPage = (e) => {
        e.preventDefault();
        console.log('Close & go back')
    };

    replaceToAction = (rez) => {
        axios.post('https://178.172.235.105/~api/json/fusers.doc/createUserDoc',JSON.stringify(rez))
            .then(res => console.log('response: ',res))
            .catch(err => console.log('error: ',err))
    };

    render(){

        const langs = [{
            title: 'Русский',
            value: 'russian',
        },{
            title: 'Английсктй',
            value: 'english',
        },{
            title: 'Немецкий',
            value: 'german',
        }];
        const payments = [100,300,500];
        const academicTitle = [{
            title: 'Кандидат медицинских наук',
            value: 'candidat_medicine_science',
        },{
            title: 'Доктор медицинских наук',
            value: 'doctor_medicine_science',
        }];
        const academicDegree = [{
            title: 'Доцент',
            value: 'docent',
        },{
            title: 'Профессор',
            value: 'professor',
        }];



        return (
            <Hoc>
                <div className="loginPage-header">
                    <div className="loginPage-header-close">
                        <Icon type='close' svg onClick={this.closeAuthPage}/>
                    </div>
                </div>
    
                <Row>
                    <Col xs={{span: 24}}
                         sm={{span: 22, offset: 1}}
                         md={{span: 18, offset: 3}}
                         lg={{span: 14, offset: 5}}
                         xl={{span: 12, offset: 6}}>
                        <Route path="/login"
                               exact
                               render={() => (
                                   <Login urlForget={this.props.match.url + '/forget'}
                                          urlRegistration='/registration'
                                          errorCode={this.props.errorCode}
                                          onSubmit={(obj) => this.props.onLogin(obj, this.props.history)}
                                   />
                               )}/>
                        <Route path="/login/forget"
                               exact
                               render={() => <LoginForget urlLogin={this.props.match.url}
                                                          onUrlChange={() => {
                                                              this.props.history.replace(this.props.match.url)
                                                          }}/>}
                        />
                        <Route path="/registration"
                               exact
                               render={() => <Registration onFinish={obj => this.replaceToAction(obj)}
                                                           langs={langs}
                                                           payments={[50,75,100,125,150]}
                                                           academicTitle = {academicTitle}
                                                           academicDegree = {academicDegree}
                                                           finalText='to continue'
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
        //reviews: state.reviews.reviews,
        errorCode: state.auth.errorCode,
	}
};

const mapDispatchToProps = dispatch => {
	return {
        //onGetAllReviews: () => dispatch(actions.getAllReviews()),
        onLogin: ({userName, password, remember}, history) => dispatch(actions.login(userName, password, remember, history))
		//onSendAnswer: (answer) => dispatch(actions.putCommentAnswer(answer)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);