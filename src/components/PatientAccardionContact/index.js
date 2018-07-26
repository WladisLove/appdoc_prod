import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import PatientAccardionContactItem from '../PatientAccardionContactItem'
import Accordion from '../Accordion'

import './style.css'
import '../../icon/style.css'

class PatientAccardionContact extends React.Component{

    render(){
        const { contactFio, contactPhone, contactEmail, contactAdress, contactPas, contactNewPas } = this.props;
        const rootClass = cn('patient-contacts-accardion');
        const Panel = Accordion.Panel;
        
        return (
            <div className={rootClass}>
               <Accordion defaultActiveKey={['1']}>
                    <Panel header="Контакты" key="1">
                        <PatientAccardionContactItem
                            contactFio='Иванова Александра Константиновна'
                            contactPhone='+ 375 29 234 74 55'
                            contactEmail='ivanova234@mail.ru'
                            contactAdress='г. Минск, ул. Строителей, д. 34, кв. 18'
                            contactPas='test'
                            contactNewPas=''
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