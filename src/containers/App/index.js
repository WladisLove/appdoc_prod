import React  from 'react';
import {appRoutes, menuItems} from '../../routes'
import { Switch, Route } from 'react-router-dom'
import { Button, Row, Col, SideNav} from 'appdoc-component'
import {Layout} from 'antd'

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
        const  siderClass = collapsed ? 'collapsed' : '';
        return (
            <Layout>
                <Layout.Sider className={siderClass}>
                    <SideNav onClick={this.toggle}
                             menuItems={menuItems}
                             isShort={this.state.collapsed}/>
                </Layout.Sider>
                <Layout>
                    <Layout.Header>
                        Header
                    </Layout.Header>
                    <Switch>
                        {appRoutes.map(route => renderRoutes(route))}
                        <Route
                            exact
                            component={() => (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <h3>Страница не найдена</h3>
                                    <p>Проверьте введённый адрес</p>
                                </div>
                            )}
                        />
                    </Switch>
                    <Layout.Footer>
                        Footer
                    </Layout.Footer>
                </Layout>
            </Layout>
        );
    }
}

export default App;