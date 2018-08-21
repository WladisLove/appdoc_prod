import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import PatientAccardionContactItem from '../PatientAccardionContactItem'
import Accordion from '../Accordion'

import './style.css'
import '../../icon/style.css'

class PatientAccardionContact extends React.Component{

    render(){
        const { fio, phone, email, address, avatar} = this.props.profile;
        const rootClass = cn('patient-contacts-accardion');
        const Panel = Accordion.Panel;
        
        return (
            <div className={rootClass}>
               <Accordion defaultActiveKey={['1']}>
                    <Panel header="Контакты" key="1">
                        <PatientAccardionContactItem
                            contactFio={fio}
                            contactPhone={phone}
                            contactEmail={email}
                            contactAddress={address}
                            contactAvatar={avatar}
                            onSubmit={this.props.onSubmit}
                            onSubmitPassword={this.props.onSubmitPassword}
                            onDeleteAvatar={this.props.onDeleteAvatar}
                        />
                    </Panel>
                </Accordion>
            </div>
        )
    }
}

PatientAccardionContact.propTypes = {
    contactFio: PropTypes.string,
    contactPhone: PropTypes.string,
    contactEmail: PropTypes.string,
    contactAdress: PropTypes.string,
    contactPas: PropTypes.string,
    contactNewPas: PropTypes.string,
};

PatientAccardionContact.defaultProps = {
    contactFio: '',
    contactPhone: '',
    contactEmail: '',
    contactAdress: '',
    contactPas: '',
    contactNewPas: '',
};

export default PatientAccardionContact