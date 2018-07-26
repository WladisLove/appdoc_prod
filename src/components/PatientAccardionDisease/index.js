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
                    <Panel header="Хронические болезни, аллергии" key="1">
                        <PatientAccardionDiseaseItem
                            title="Хронические болезни"
                            diseases={[
                                {disease: 'Хронический миокардит', diseaseDate: '01.01.1999'},
                                {disease: 'Кардиомиопатия', diseaseDate: '01.01.1999'},
                            ]}
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