import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import PatientAccardionDiseaseItem from '../PatientAccardionDiseaseItem'
import Accordion from '../Accordion'
import { Translate } from 'react-localize-redux'
import './style.css'
import '../../icon/style.css'

class PatientAccardionDisease extends React.Component{
    renderDiseases = (diseases) => {
        return diseases.map((item, index)=> {

        })
    };
    render(){
        const { title, disease, diseaseDate } = this.props;
        const rootClass = cn('disease-all');
        const Panel = Accordion.Panel;


        return (
            <div className={rootClass}>
                <Accordion defaultActiveKey={['1']}>
                    <Panel header={<Translate id="personal.chronicDiseases" />} key="1">
                        <PatientAccardionDiseaseItem
                            diseases={this.props.diseases}
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
