import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {LocaleProvider} from 'antd'
import ru_RU from 'antd/lib/locale-provider/ru_RU';

import LoginPage from '../LoginPage'
import App from '../App'

class Root extends React.Component{

    render(){
        return (
            <LocaleProvider locale={ru_RU}>
        <Switch>
            
            <Route path="/login" component={LoginPage}/>
            <Route path="/registration" component={LoginPage}/>
            {/*1 && <Redirect to='login'/>*/}
            <Route path="/" component={App} />
        </Switch>
        </LocaleProvider>)
    }
};

export default Root