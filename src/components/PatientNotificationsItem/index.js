import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import Button from '../Button'
import Checkbox from '../Checkbox'

import './style.css'
import '../../icon/style.css'

class PatientNotificationsItem extends React.Component{

    render(){
        const { title, contact } = this.props;
        const rootClass = cn('notifications-item');

        return (
            <div className={rootClass}>
                <div className='notifications-item-title'>{title}</div>
                <div className='notifications-item-checkbox'>
                    <Checkbox>{contact}</Checkbox>
                </div>
                
            </div>
        )
    }
}

PatientNotificationsItem.propTypes = {
    title: PropTypes.string,
    contact: PropTypes.string,
};

PatientNotificationsItem.defaultProps = {
    contact: '',
};

export default PatientNotificationsItem