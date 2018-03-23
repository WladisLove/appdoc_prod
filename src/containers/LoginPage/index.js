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

const LoginPage = (props) => {

    const closeAuthPage = (e) => {
        e.preventDefault();
        console.log('Close & go back')
    };

    const replaceToAction = (rez) => {
        axios.post('https://178.172.235.105/~api/json/fusers.doc/createUserDoc',JSON.stringify(rez))
            .then(res => console.log('response: ',res))
            .catch(err => console.log('error: ',err))
    };

    /*const loginHandler = (values) => {
        console.log(values)
        axios.post('https://178.172.235.105/~api/json/fusers.doc/loginDoc',
            JSON.stringify({
                login: values.userName,
                password: values.password,
            }))
                .then(res => {
                    console.log('response: ',res);

                    !res.data.error 
                        ? props.history.push('/') 
                        : res.data.error.code === 400 
                            ? alert('неверный логин или пароль')
                            : alert('такого пользователя не существует')
                    
                })
                .catch(err => console.log('error: ',err))
    }*/


    return (
        <Hoc>
            <div className="loginPage-header">
                <div className="loginPage-header-close">
                    <Icon type='close' svg onClick={closeAuthPage}/>
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
                               <Login urlForget={props.match.url + '/forget'}
                                      urlRegistration='/registration'
                                      onSubmit={() => onLogin}
                               />
                           )}/>
                    <Route path="/login/forget"
                           exact
                           render={() => <LoginForget urlLogin={props.match.url}
                                                      onUrlChange={() => {
                                                          props.history.replace(props.match.url)
                                                      }}/>}
                    />
                    <Route path="/registration"
                           exact
                           render={() => <Registration onFinish={obj => replaceToAction(obj)}
                                                       langs={['rus','eng','ua']}
                                                       payments={[50,75,100,125,150]}
                                                       academicTitle = {['title1', 'title2']}
                                                       finalText='to continue'
                           />}
                    />
                </Col>
            </Row>
        </Hoc>
    )

}

const mapStateToProps = state => {
	return {
        //reviews: state.reviews.reviews,
        error: state.auth.error,
	}
};

const mapDispatchToProps = dispatch => {
	return {
        //onGetAllReviews: () => dispatch(actions.getAllReviews()),
        onLogin: (userName, password, remember) => dispatch(actions.login(userName, password, remember))
		//onSendAnswer: (answer) => dispatch(actions.putCommentAnswer(answer)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);