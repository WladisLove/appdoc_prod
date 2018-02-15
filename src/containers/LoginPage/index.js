import React from 'react'

import {Route} from 'react-router-dom'
import Hoc from '../../hoc'

import {
    Icon, Row, Col,
    Login, LoginForget, Registration
} from 'appdoc-component'

import './styles.css'

const LoginPage = (props) => {

    const closeAuthPage = (e) => {
        e.preventDefault();
        console.log('Close & go back')
    };


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
                           render={() => <Registration/>}
                    />
                </Col>
            </Row>
        </Hoc>
    )

}

export default LoginPage;