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
        const rootClass = cn('patient-contacts');
        const Panel = Accordion.Panel;
        
        return (
            <div className={rootClass}>
               <Accordion defaultActiveKey={['1']}>
                    <Panel header="Хронические болезни, аллергии" key="1"> 
                        <PatientAccardionContactItem  
                            title="Хронические болезни"
                            disease="Хронический миокардит"
                            diseaseDate="21.06.1999"
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