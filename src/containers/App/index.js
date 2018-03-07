import React  from 'react';
import {appRoutes, menuItems} from '../../routes'
//import LoginPage from '../LoginPage'
import { Route, Switch } from 'react-router-dom'
import { /*Button, Row, Col,*/ SideNav} from 'appdoc-component'
//import {Layout} from 'antd'

//import SideNav from '../../components/SideNav'

// import { connect } from 'react-redux'

import './styles.css';

const renderRoutes = ({ path, component, exact }) => (
    <Route key={path} exact={exact} path={path} component={component} />
    //<PrivateRoute key={path} exact={exact} path={path} component={component} />
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
        const {collapsed} = this.state;
        const  siderClass = collapsed ? 'main-sidebar collapsed' : 'main-sidebar';
        const  wrapperClass = collapsed ? 'main-wrapper collapsed' : 'main-wrapper';
        return (
            <div className="main">
                <div className={siderClass}>
                    <SideNav onClick={this.toggle}
                             menuItems={menuItems}
                             isShort={this.state.collapsed}/>
                </div>
                <div className={wrapperClass}>
                    <div className="main-header">
                        Header (replace)
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
                </div>
            </div>
        );
    }
}

export default App;