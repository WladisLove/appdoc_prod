import React from 'react'

import { Route } from 'react-router-dom'
import Hoc from '../../hoc'

import { Icon, Row, Col, Login, LoginForget } from 'appdoc-component'
// import LoginForget from '../../components/LoginForget'


import './styles.css'

class LoginPage extends React.Component{

    render(){
        // console.log(this.props.match.url)
        // this.props.history.replace('/schedule')

        return (
            <Hoc>
                <div className="loginPage-header">
                    <div className="loginPage-header-close">
                        <Icon type='close' svg/>
                    </div>
                </div>

                    <Row>
                        <Col xs={{span:24}}
                             sm={{span:22, offset:1}}
                             md={{span:18, offset:3}}
                             lg ={{span:14, offset:5}}
                             xl={{span:12, offset:6}}>
                            <Route path="/login"
                                   exact
                                   render={() => (
                                       <Login urlForget={this.props.match.url+'/forget'}/>
                                   )}/>
                            <Route path="/login/forget"
                                   exact
                                   render={() => <LoginForget urlLogin={this.props.match.url}
                                                              onUrlChange={() =>
                                                              {this.props.history.replace(this.props.match.url)}}/>}
                            />
                        </Col>
                    </Row>
            </Hoc>
        )
    }
}

export default LoginPage;