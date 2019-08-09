import React from 'react';
import PropTypes from 'prop-types'

import Button from '../Button'
import Icon from '../Icon'
import SwitchPanel from '../SwitchPanel'
import NotificationApp from '../NotificationApp'
import AutoComplete from '../AutoComplete'
import Hoc from "../Hoc"
import specs from "../../helpers/specsArray"
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'
import NewFreeVisitByPatient from "../NewFreeVisitByPatient";
import NewVisitTypeModal from "../NewVisitTypeModal";
import NewEmergencyVisit from "../NewEmergencyVisit";
import LanguageToggle from "../LanguageToggle";
import {Form} from "antd";


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
    const {notifications, isUser, userBalance, isShort} = this.props;
        return (
             <Translate>
                {({ translate }) =>
                    (<div className={'header'}>
                        <div className={"header-search" + " " + (isShort ? 'header-search-short':'')}>
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
                                    <div className='wrapper-paymet-score'>{translate('button.title.theBalance').toUpperCase()}: {userBalance ? userBalance : '0.00'}</div>
                                    <Button btnText={translate('emergencyCall')}
                                        size={isShort?"verysmall":"small"}
                                        type='emergensy'
                                        icon='emergency-call'
                                        onClick = {() => this.setState({emergencyVisit: true})}/>
                                    <Button btnText={translate('button.title.makeAnReception')}
                                        onClick={this.handleClick}
                                        size={isShort?"verysmall":"small"}
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
                                        docTypes = {this.props.docSpecialities}
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
                                    title={translate(`emergencyCall`)}
                                    onChange={this.props.onChange}
                                    checked={this.props.checked}
                                    disabled={this.props.disabled}/>)
                            }
                        </div>
                        <LanguageToggle  
                                className={'header-lang-select' + (isShort ? '-short':'')}
                                changeLangSelector={this.props.changeLangSelector}
                            />
                        <div className='header-notification'>
                            <NotificationApp
                                data={notifications}
                                getNotifications={this.props.getNotifications}
                                getId={this.props.getNotifId}>
                                    <Icon
                                        svg
                                        type='notification'
                                        size={20}
                                        title={translate(`notifications`)}
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
                                title={translate(`exit`)}
                                onClick={this.props.logout}
                            />
                        </div>
                    </div>)
                }
            </Translate>
        )
    }
}

Header.propTypes = {
    notifications: PropTypes.array,
    logout: PropTypes.func,
    isUser: PropTypes.bool,
    docSpecialities: PropTypes.array

};

Header.defaultProps = {
    notifications: [],
    logout: () => {},
    isUser: false,
};

export default Header
