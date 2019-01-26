import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'
import moment from 'moment'

import PatientNotificationsItem from '../PatientNotificationsItem'
import Card from '../Card'
import Button from '../Button'
import { Translate } from 'react-localize-redux'

import './style.css'
import '../../icon/style.css'

class PatientNotifications extends React.Component{

    render(){
        const { title, contact } = this.props;

        return (<div>
            <Translate>
                {({ translate }) =>
                    (<div className='notifications-all'>
                        <Card title={translate('notifications.title')}>
                            <PatientNotificationsItem title={translate('sendOnMail')} contact={translate('mail')}/>
                            <PatientNotificationsItem title={translate('onPhone')} contact='+375 (29) 111-1-11'/>
                            <div className='notifications-btn'>
                                 <Button
                                    btnText={translate('button.title.saveChanges')}
                                    size='default'
                                    type='float'
                                />
                            </div>
                        </Card>
                    </div>)
                }
            </Translate>
        </div>)
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
