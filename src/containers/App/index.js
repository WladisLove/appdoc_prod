import React  from 'react';
import {appRoutes, menuItems} from '../../routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { SideNav, Header} from 'appdoc-component'
import Hoc from '../../hoc'

import { NavLink } from 'react-router-dom'

import {connect} from 'react-redux';

import * as actions from '../../store/actions'
import './styles.css';

const renderRoutes = ({ path, component, exact }) => (
    <Route key={path} exact={exact} path={path} component={component} />
);

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentWillMount(){
        const login = localStorage.getItem('_appdoc-user'),
                pass = localStorage.getItem('_appdoc-pass');
        (!this.props.id && login && pass) &&
        this.props.onLogin({
            userName: login, 
            password: pass,
        }, this.props.history);

        this.props.id && (this.props.getDocShortInfo());
    }

    gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
    }
    
    render() {
        const {collapsed} = this.state;
        const  siderClass = collapsed ? 'main-sidebar collapsed' : 'main-sidebar';
        const  wrapperClass = collapsed ? 'main-wrapper collapsed' : 'main-wrapper';
                

        return (
            <div className="main">
            {
                this.props.id ? 
            
                (<Hoc>
                    <div className={siderClass}>
                    
                    <SideNav {...this.props.shortDocInfo}
                            rateValue={+(this.props.shortDocInfo.rateValue)}
                            onClick={this.toggle}
                            menuItems={menuItems}
                            isShort={this.state.collapsed}/>
                            
                </div>
                <div className={wrapperClass}>
                <div style={{position: 'absolute', zIndex: 999}}><NavLink to='/chat'>chat</NavLink></div>
                    <div className="main-header">
                        <Header data={this.props.notDocPatients}
                                onGoto={this.gotoHandler}
                                onAdd={(id, name) => {
                                    this.props.addPatient(id, name)
                                    console.log(id,name)
                                }}
                                findName={(name) => {
                                    this.props.onGetNotDocPatients(name),
                                    console.log(name)
                                }}
                                logout={this.props.onLogout}/>
                    </div>
                    <div className="main-content">
                        <Switch>
                            {appRoutes.map(route => renderRoutes(route))}
                            <Route
                                render ={() => (
                                    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                        <h3>Страница не найдена</h3>
                                        <p>Проверьте введённый адрес</p>
                                    </div>
                                )}
                            />
                        </Switch>
                    </div>
                </div>
                <div className="main-footer">
                        <div className="main-footer-item company">AppDoc 2017</div>
                        <div className="main-footer-item copirate">© Все права защищены</div>
                </div> </Hoc>)
            : (
                /*(localStorage.getItem('_appdoc-user') && localStorage.getItem('_appdoc-pass'))
                    ?  this.props.onLogin({
                        userName: localStorage.getItem('_appdoc-user'), 
                        password: localStorage.getItem('_appdoc-pass'),
                    }, this.props.history)
                    :*/ <Redirect to='login'/>
            )
            }
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        auth: state.auth,
        id: state.auth.id,
        shortDocInfo: state.doctor.shortInfo,
        notDocPatients: state.patients.notDocPatients,
    }
}

const mapDispatchToProps = dispatch => {
	return {
        onLogin: ({userName, password, remember}, history) => dispatch(actions.login(userName, password, remember, history)),
        onLogout: () => dispatch(actions.logout()),
        getDocShortInfo: () => dispatch(actions.getDocShortInfo()),
        onGetNotDocPatients: (name) => dispatch(actions.getNotDocPatients(name)),
        onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        addPatient: (id, name) => dispatch(actions.addPatient(id, name)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);