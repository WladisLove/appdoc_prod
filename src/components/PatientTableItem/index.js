import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import { Translate } from 'react-localize-redux'
import Button from '../Button'
import ProfileAvatar from '../ProfileAvatar'
import './style.css'
import '../../icon/style.css'

class PatientTableItem extends React.Component{
    render(){
        const { id, name, age, size, time, date, status_user, online, avatar, onGoto, dateend, datestart} = this.props;
        const isOnline = status_user === undefined ? !!online : !!status_user;


        return (
            <Translate>
                {({ translate }) =>
                    (<div className='patient-item'>
                        <div className="flex-col"><ProfileAvatar id={id} owner="patient" online={isOnline} img={avatar} size={size}/></div>
                        <div className="flex-col">
                            <div className="patient-item-name">
                                <div onClick={() => onGoto(id)} className='go-to'>{name}</div>
                            </div>
                            <div className="patient-item-age">{age} {translate('yearsOld')}</div>
                        </div>
                        <div className="flex-col">
                            <div className="patient-item-title">{translate('reception.last')}:</div>
                            <div className="patient-item-time">

                                {datestart && dateend ? moment.unix(datestart).format('DD.MM.YYYY') : <span>&mdash;</span> }
                                <br/>
                                {datestart && dateend ? `${moment.unix(datestart).format('HH:mm')} - ${moment.unix(dateend).format('HH:mm')}` : null}

                            </div>
                        </div>
                        <div className="flex-col">
                            <Button onClick={() => this.props.setModal1Visible(true, id, name)}
                                btnText={translate('button.title.makeAnReception')}
                                size='default'
                                type='float'
                                icon='form'
                                iconSize={12}
                            />
                        </div>
                        <div className="flex-col">
                            <Button onClick={(e) => {
                                    e.preventDefault();
                                    this.props.setModal2Visible(true, id, name)
                                }}
                                size='file'
                                type='file'
                                icon='mail'
                                iconSize={16}
                                title={translate('button.title.newMessage')}
                            />
                        </div>
                        <div className="flex-col">
                            <Button
                                size='file'
                                type='file'
                                icon='empty'
                                iconSize={24}
                                title={translate('button.title.removePatient')}
                                onClick = {() => this.props.onDelete(this.props.id, this.props.name, translate)}
                            />
                        </div>

                    </div>)
                }
            </Translate>
        )
    }
}

PatientTableItem.propTypes = {
    id: PropTypes.number,
    avatar: PropTypes.string,
    name: PropTypes.string,
    onChangeDate: PropTypes.func,
    onNewVisit: PropTypes.func,
    onNewMessage: PropTypes.func,
    onDelete: PropTypes.func,
    onGoto: PropTypes.func,
};

PatientTableItem.defaultProps = {
    id: 0,
    avatar: '',
    name: '',
    size: 'small',
    onChangeDate: () => {},
    onNewVisit: () => {},
    onNewMessage: () => {},
    onDelete: () => {},
    onGoto: () => {},
};

export default PatientTableItem
