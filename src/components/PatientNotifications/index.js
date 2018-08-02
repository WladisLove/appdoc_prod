import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import PatientNotificationsItem from '../PatientNotificationsItem'
import Card from '../Card'
import Button from '../Button'

import './style.css'
import '../../icon/style.css'

class PatientNotifications extends React.Component{

    render(){
        const { title, contact } = this.props;

        return (
            <div className='notifications-all'>
                <Card title="Уведомления">
                    <PatientNotificationsItem title='Присылать на почту' contact='Почта'/>
                    <PatientNotificationsItem title='На телефон' contact='+375 (29) 111-1-11'/>
                    <div className='notifications-btn'>
                         <Button
                            btnText='Сохранить изменения'
                            size='default'
                            type='float'
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

PatientNotifications.propTypes = {
    title: PropTypes.string,
    contact: PropTypes.string,
};

PatientNotifications.defaultProps = {
    contact: '',
};

export default PatientNotifications