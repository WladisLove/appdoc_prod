import React from 'react';
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'
import SwitchPanel from '../SwitchPanel'
import NotificationApp from '../NotificationApp'
import AutoComplete from '../AutoComplete'
import Hoc from "../Hoc"

import './style.css'
import '../../icon/style.css'
import NewFreeVisitByPatient from "../NewFreeVisitByPatient";


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isNewFreeVisit: false
        };
    }
    
    handleClick = () => {
      this.setState({isNewFreeVisit: true})
    };
render() {
    const {notifications, isUser, onEmergCall, onAddVisit} = this.props;
        return (
            <div className={'header'}>
                <div className='header-search'>
                    <AutoComplete
                        onAdd = {this.props.onAdd}
                        onGoto = {this.props.onGoto}
                        findName= {this.props.findName}
                        data={this.props.data}
                        isUser = {isUser}
                    />
                </div>
                <div className='header-call'>
                    {isUser ? 
                        <Hoc>
                            <Button btnText='ЭКСТРЕННЫЙ ВЫЗОВ'
                                onClick={onEmergCall}
                                size='small'
                                type='emergensy'
                                icon='emergency-call'/>
                            <Button btnText='ЗАПИСАТЬСЯ НА ПРИЕМ'
                                onClick={this.handleClick}
                                size='small'
                                type='float'
                                icon='form'/>
                            <NewFreeVisitByPatient
                                visible = {this.state.isNewFreeVisit}
                                docTypes = {["Аллерголог", "Хирург", "Терапевт", "Окулист"]}
                                onCancel = {() => this.setState({isNewFreeVisit: false})}

                            />
                        </Hoc> 
                        : <SwitchPanel 
                            icon='emergency-call'
                            title="Экстренные вызовы"
                            onChange={this.props.onChange}
                            checked={this.props.checked}
                            disabled={this.props.disabled}/>
                    }
                </div>
                <div className='header-notification'>
                    <NotificationApp  
                        data={notifications} 
                        getNotifications={this.props.getNotifications}
                        getId={this.props.getNotifId}>
                         <Icon 
                            svg 
                            type='notification' 
                            size={20}
                            title='Уведомления'
                        />
                    </NotificationApp>
                </div>
                <div className='header-exit'>
                    <Button
                        btnText=''
                        size='icon'
                        type='icon'
                        icon='exit'
                        iconSize={20}
                        svg
                        title='Выход'
                        onClick={this.props.logout}
                    />
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    notifications: PropTypes.array,
    logout: PropTypes.func,
    isUser: PropTypes.bool,

};

Header.defaultProps = {
    notifications: [],
    logout: () => {},
    isUser: false,
};

export default Header