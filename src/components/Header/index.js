import React from 'react';
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'
import SwitchPanel from '../SwitchPanel'
import NotificationApp from '../NotificationApp'
import AutoComplete from '../AutoComplete'
import Hoc from "../Hoc"
import specs from "../../helpers/specsArray"

import './style.css'
import '../../icon/style.css'
import NewFreeVisitByPatient from "../NewFreeVisitByPatient";
import NewVisitTypeModal from "../NewVisitTypeModal";
import NewEmergencyVisit from "../NewEmergencyVisit";


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isNewFreeVisit: false,
            chooseTypeVisitVisible: false,
            emergencyVisit: false
        };
    }

    handleClick = () => {
      this.setState({isNewFreeVisit: true})
    };

render() {
    const {notifications, isUser, userBalance} = this.props;
        return (
            <div className={'header'}>
                <div className='header-search'>
                    <AutoComplete
                        onAdd = {this.props.onAdd}
                        onDelete = {this.props.onDelete}
                        onGoto = {this.props.onGoto}
                        findName= {this.props.findName}
                        data={this.props.data}
                        isUser = {isUser}
                    />
                </div>
                <div className='header-call'>
                    {isUser ?
                        <Hoc>
                            <div className='wrapper-paymet-score'>Текущий счет: {userBalance ? userBalance : '0.00'}</div> 
                          
                            <Button btnText='ЭКСТРЕННЫЙ ВЫЗОВ'
                                size='small'
                                type='emergensy'
                                icon='emergency-call'
                                onClick = {() => this.setState({emergencyVisit: true})}/>
                            <Button btnText='ЗАПИСАТЬСЯ НА ПРИЕМ'
                                onClick={this.handleClick}
                                size='small'
                                type='float'
                                icon='form'/>
                            <NewVisitTypeModal
                                visible = {this.state.chooseTypeVisitVisible}
                                onCancel = {() => this.setState({chooseTypeVisitVisible: false})}
                                onFree = {
                                    () => {this.setState({
                                        chooseTypeVisitVisible: false,
                                        isNewFreeVisit: true
                                    })}

                                }
                            />
                            <NewFreeVisitByPatient
                                visible = {this.state.isNewFreeVisit}
                                docTypes = {specs}
                                onCancel = {() => this.setState({isNewFreeVisit: false})}
                                onSubmit = {this.props.onMakeVisit}
                                getFreeVisitIntervals = {this.props.getFreeVisitIntervals}
                                freeVisitsIntervals = {this.props.freeVisitsIntervals}
                                onMakeFreeVisit = {this.props.onMakeVisit}

                            />
                            <NewEmergencyVisit
                                visible = {this.state.emergencyVisit}
                                onCancel = {() => this.setState({emergencyVisit: false})}
                                onSubmit = {this.props.onMakeVisit}
                            />
                        </Hoc>
                        : (this.props.emergencyAvailable && <SwitchPanel
                            icon='emergency-call'
                            title="Экстренные вызовы"
                            onChange={this.props.onChange}
                            checked={this.props.checked}
                            disabled={this.props.disabled}/>)
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
