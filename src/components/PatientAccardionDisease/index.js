import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import PatientAccardionDiseaseItem from '../PatientAccardionDiseaseItem'
import Accordion from '../Accordion'

import './style.css'
import '../../icon/style.css'

class PatientAccardionDisease extends React.Component{

    render(){
        const { title, disease, diseaseDate } = this.props;
        const rootClass = cn('disease-all');
        const Panel = Accordion.Panel;
        
        return (
            <div className={rootClass}>
                <Accordion defaultActiveKey={['1']}>
                    <Panel header="Контакты" key="1">
                        <PatientAccardionDiseaseItem  
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

PatientAccardionDisease.propTypes = {

};

PatientAccardionDisease.defaultProps = {

};

export default PatientAccardionDisease