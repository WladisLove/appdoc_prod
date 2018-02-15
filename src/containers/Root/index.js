import React from 'react'
import { Switch, Route } from 'react-router-dom'

import LoginPage from '../LoginPage'
import App from '../App'

const Root = () => (
    <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/registration" component={LoginPage}/>
        <Route path="/" component={App} />
    </Switch>
);

export default Root