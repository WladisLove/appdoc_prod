import React  from 'react';
import {appRoutes, menuItems} from '../../routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { SideNav} from 'appdoc-component'
import Hoc from '../../hoc'

import { NavLink } from 'react-router-dom'

import {connect} from 'react-redux';

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

    render() {
        console.log('auth',this.props.auth)
        const {collapsed} = this.state;
        const  siderClass = collapsed ? 'main-sidebar collapsed' : 'main-sidebar';
        const  wrapperClass = collapsed ? 'main-wrapper collapsed' : 'main-wrapper';
        return (
            <div className="main">
            {
                this.props.id ? 
            
                (<Hoc>
                    <div className={siderClass}>
                    <SideNav onClick={this.toggle}
                            img="https://www.proza.ru/pics/2017/06/03/1990.jpg"
                             menuItems={menuItems}
                             isShort={this.state.collapsed}/>
                </div>
                <div className={wrapperClass}>
                    <div className="main-header">
                        {/*Header  (replace) */}
                        <NavLink exact to='/registration'
                            style={{padding: '0 5px', borderRight: '1px solid blue'}}>
                            Регистрация
                        </NavLink>
                        <NavLink exact to='/login'
                            style={{padding: '0 5px', borderRight: '1px solid blue'}}>
                            Логин
                        </NavLink>
                        <NavLink exact to='/chat'
                            style={{padding: '0 5px', borderRight: '1px solid blue'}}>
                            Чат
                        </NavLink>
                        <NavLink exact to='/patients-page'
                            style={{padding: '0 5px', borderRight: '1px solid blue'}}>
                            Страница пациента
                        </NavLink>
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
            : <Redirect to='login'/> 
            }
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        auth: state.auth,
        id: state.auth.id,
    }
}

export default connect(mapStateToProps, null)(App);