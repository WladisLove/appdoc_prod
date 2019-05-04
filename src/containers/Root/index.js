import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import LoginPage from '../LoginPage'
import App from '../App'

import { renderToStaticMarkup } from 'react-dom/server'
import { withLocalize } from 'react-localize-redux'
import { translations } from '../../translations'


class Root extends React.Component{
    constructor(props) {
        super(props);

        this.props.initialize({
            languages: [
                { name: "English", code: "en" },
                { name: "Русский", code: "ru" }
            ],
            translation: translations,
            options: {
                renderToStaticMarkup,
                renderInnerHtml: true,
                defaultLanguage: localStorage.getItem("lang") ? localStorage.getItem("lang"): 'ru'
            }
        });
    }

    render(){
        console.log('window.location :', window.location);
        return (
        window.location.search ?
            <Redirect to={`/app/${window.location.search.split("?path=")[1]}`}/>
        :
        <Switch>
            <Route path="/app/login" component={LoginPage}/>
            <Route path="/app/registration" component={LoginPage}/>
            <Route path="/app/patient-registration" component={LoginPage}/>

            {/*1 && <Redirect to='login'/>*/}
            <Route path="/app" component={App} />
            {/*REDIRECT TO APP NEED TO DELETE THEN*/}
            {/*<Route render={() => <Redirect to="/app"/>}/>*/}
            <Route exact path="/" render={() => <Redirect to="/app"/> }/>
        </Switch>)
    }
};

export default withLocalize(Root)
