import React from 'react'
import { Switch, Route } from 'react-router-dom'


import LoginPage from '../LoginPage'
import App from '../App'

class Root extends React.Component{

    render(){
        return (
        <Switch>
            
            <Route path="/login" component={LoginPage}/>
            <Route path="/registration" component={LoginPage}/>
            {/*1 && <Redirect to='login'/>*/}
            <Route path="/" component={App} />
        </Switch>)
    }
};

export default Root