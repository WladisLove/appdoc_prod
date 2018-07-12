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


const Header = (props) => {

    
        const {notifications, isUser, onEmergCall, onAddVisit} = props;

        return (
            <div className={'header'}>
                <div className='header-search'>
                    <AutoComplete
                        onAdd = {props.onAdd}
                        onGoto = {props.onGoto}
                        findName= {props.findName}
                        data={props.data}
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
                                onClick={onAddVisit}
                                size='small'
                                type='float'
                                icon='form'/>
                        </Hoc> 
                        : <SwitchPanel 
                            icon='emergency-call'
                            title="Экстренные вызовы"
                            onChange={props.onChange}
                            checked={props.checked}
                            disabled={props.disabled}/>
                    }
                </div>
                <div className='header-notification'>
                    <NotificationApp  
                        data={notifications} 
                        getNotifications={props.getNotifications}
                        getId={props.getNotifId}>
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
                        onClick={props.logout}
                    />
                </div>
            </div>
        )
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