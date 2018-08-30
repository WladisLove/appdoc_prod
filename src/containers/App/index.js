import React  from 'react';
import {docRoutes, patientRoutes, menuDoc, menuPatient} from '../../routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import Hoc from '../../hoc'
import SideNav from '../../components/SideNav'
import Header from "../../components/Header";

import {connect} from 'react-redux';
import {createSocket, closeSocket,register} from './chatWs'

import * as actions from '../../store/actions'
import './styles.css';
import 'antd/dist/antd.css';
import '../../styles/fonts.css';
import ab from '../../autobahn.js'
import Icon from "../../components/Icon";

const renderRoutes = ({ path, component, exact }) => (
    <Route key={path} exact={exact} path={path} component={component} />
);


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            notifications: [],
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }); 
    };

    componentWillUnmount(){
        closeSocket();
        this.props.setOnlineStatus(this.props.id, false)
    }

    runNotificationsWS = () => {
        let that = this;
        let conn = new ab.Session('wss://appdoc.by/wss2/',
            function() {
                that.props.getNotifications(that.props.id);
                
                conn.subscribe(""+that.props.id, function(topic, data) {
                    that.props.setExInfo(data.exInterval)
                    that.setState({notifications: JSON.parse(data.arr)})
                });
            },
            function() {
                console.warn('WebSocket connection closed');
            },
            {'skipSubprotocolCheck': true}
        );
    }

    runChatWS = () => {
        const {chatProps, setChatFromId, setChatToId, setReceptionStatus, setIsCallingStatus, 
            setChatStory, onSelectReception, setNewTimer} = this.props;
        //'wss://appdoc.by:8443/one2one'
        //'wss://localhost:8443/one2one'
        createSocket(
            'wss://appdoc.by:8443/one2one',
            chatProps,
            {
                setChatFromId,
                setChatToId,
                setReceptionStatus,
                setIsCallingStatus,
                setChatStory,
                onSelectReception,
                setNewTimer,

                get_from: () => this.props.from,
            get_to: () => this.props.to,
            get_receptionStarts: () => this.props.receptionStarts,
            get_isCalling: () => this.props.isCalling,
            get_user_mode: () => this.props.mode,
            get_chatStory: () => this.props.chatStory,

            get_visitInfo: () => this.props.visitInfo,
            get_timer: () => this.props.timer,

            get_history: () => this.props.history,
            }
        );
        register(''+this.props.id, ''/*+this.props.user_id*/, this.props.auth.mode);
    }

    componentDidMount() {
        if(this.props.id){
            this.runNotificationsWS();
            this.runChatWS();            
        }
        
    }

    componentWillMount(){
        const login = localStorage.getItem('_appdoc-user'),
                pass = localStorage.getItem('_appdoc-pass');
        (!this.props.id && !this.props.mode && login && pass) &&
        this.props.onLogin({
            userName: login, 
            password: pass,
        }, this.props.history);

        this.props.id && (this.props.getDocShortInfo());
    }

    gotoHandler = (id) => {
        this.props.auth.mode !== "user" ? this.props.history.push('/patient'+id) : this.props.history.push('/doctor'+id)
    };

    logoClick = () => {
        (this.props.history.location.pathname !== "/") && this.props.history.push('/');
    }

    render() {
        const {collapsed} = this.state;
        const  siderClass = collapsed ? 'main-sidebar collapsed' : 'main-sidebar';
        const  wrapperClass = collapsed ? 'main-wrapper collapsed' : 'main-wrapper';
        const isUser = (this.props.mode === "user");
        return (
            <div className="main">
            {
                this.props.id ? 
            
                (<Hoc>
                    <div className={siderClass}>
                    
                    <SideNav {...this.props.shortDocInfo}
                            rateValue={+(this.props.shortDocInfo.rateValue)}
                            onClick={this.toggle}
                            onLogoClick={this.logoClick}
                            menuItems={isUser ? menuPatient : menuDoc}
                            isUser={isUser}
                            isShort={this.state.collapsed}/>
                            
                </div>
                <div className={wrapperClass}>
                <div style={{position: 'absolute', zIndex: 999}}></div>
                    <div className="main-header">
                      <button onClick={this.toggle}
                              className="sidenav-root-btn">
                        {
                          this.state.collapsed ? (
                            <Icon type="right-arrow-forward_small" size={12} svg/>
                          ) : (
                            <Icon type="left-arrow-forward_small" size={12} svg/>
                          )
                        }
                      </button>
                        <Header data={this.props.usersHeaderSearch}
                                notifications={this.state.notifications}
                                onGoto={this.gotoHandler}
                                isUser={isUser}
                                onAdd={(id, name) => {
                                    this.props.onAddUser(id, name);
                                }}
                                onDelete={(id, name) => {
                                    this.props.onDeleteUser(id, name);
                                }}
                                findName={(name) => {
                                    this.props.onGetSearchUsers(name)
                                }}
                                getNotifId = {id => this.props.readNotification(id)}
                                getNotifications={() =>  this.props.getNotifications(this.props.id)}
                                onChange={(flag) => this.props.switchExInterval(flag)}
                                checked={this.props.isIn}
                                disabled={this.props.isIn && !this.props.isUserSet}
                                logout={this.props.onLogout}
                                getFreeVisitIntervals = {(spec) => this.props.onGetFreeVisitsBySpeciality(spec)}
                                freeVisitsIntervals = {this.props.freeVisitsIntervals ? this.props.freeVisitsIntervals : []}
                                onMakeVisit = {(obj)=>this.props.onMakeVisit(obj)}


                        />
                    </div>
                    <div className="main-content">
                        <Switch>
                            {isUser ?
                                patientRoutes.map(route => renderRoutes(route)) : docRoutes.map(route => renderRoutes(route))
                            }
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
                        <div className="main-footer-item company">AppDoc 2018</div>
                        <div className="main-footer-item copirate">© Все права защищены</div>
                </div> </Hoc>)
            : (
                <Redirect to='login'/>
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
        mode: state.auth.mode,
        shortDocInfo: state.doctor.shortInfo,
        usersHeaderSearch: state.patients.usersHeaderSearch,
        isIn: state.doctor.isEx,
        isUserSet: state.doctor.isUserSetEx,
        freeVisitsIntervals: state.schedules.freeVisitsIntervals,

        
            from: state.chatWS.from,
            to: state.chatWS.to,
            receptionStarts: state.chatWS.receptionStarts,
            isCalling: state.chatWS.isCalling,
            chatStory: state.chatWS.chatStory,
            visitInfo: state.treatments.visitInfo,
            timer: state.chatWS.timer,
        
    }
}

const mapDispatchToProps = dispatch => {
	return {
        onLogin: ({userName, password, remember}, history) => dispatch(actions.login(userName, password, remember, history)),
        onLogout: () => dispatch(actions.logout()),
        getDocShortInfo: () => dispatch(actions.getDocShortInfo()),
        onGetSearchUsers: (name) => dispatch(actions.searchUsers(name)),
        onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        onAddUser: (id, name) => dispatch(actions.addOrDeleteUserFromSearch(id, name, "add")),
        onDeleteUser: (id, name) => dispatch(actions.addOrDeleteUserFromSearch(id, name, "delete")),
        getDocTodayInfo: () => dispatch(actions.getDocTodayInfo()),
        getNotifications: (id) => dispatch(actions.getNotifications(id)),
        readNotification: (id) => dispatch(actions.readNotification(id)),
        setExInfo: ({isIn, isUserSet}) => dispatch(actions.setExIntervalInfo(isIn, isUserSet)),
        switchExInterval: (flag) => dispatch(actions.switchExInterval(flag)),
        onGetFreeVisitsBySpeciality: (spec) => dispatch(actions.getFreeVisitsBySpec(spec)),
        onMakeVisit: (info)=> dispatch(actions.setReceptionByPatient(info)),
        setOnlineStatus: (id,isOnline) => dispatch(actions.setOnlineStatus(id,isOnline)),
        
        setChatFromId: (id) => dispatch(actions.setChatFromId(id)),
        setChatToId: (id) => dispatch(actions.setChatToId(id)),
        setIsCallingStatus: (isCalling) => dispatch(actions.setIsCallingStatus(isCalling)),
        setReceptionStatus: (isStart) => dispatch(actions.setReceptionStatus(isStart)),
        setChatStory: (chat) => dispatch(actions.setChatStory(chat)),
        onSelectReception: (id, callback) => dispatch(actions.seletVisit(id, callback)),
        setNewTimer: (timer) => dispatch(actions.setNewTimer(timer)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
