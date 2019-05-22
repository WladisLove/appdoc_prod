import React from 'react';
import cn from 'classnames'

import PatientAccardionDiseaseItem from '../PatientAccardionDiseaseItem'
import Accordion from '../Accordion'
import { Translate } from 'react-localize-redux'
import './style.css'
import '../../icon/style.css'

class PatientAccardionDisease extends React.Component{
    render(){
        const rootClass = cn('disease-all');
        const Panel = Accordion.Panel;


        return (
            <div className={rootClass}>
                <Accordion defaultActiveKey={['1']}>
                    <Panel header={<Translate id="personal.chronicDiseases" />} key="1">
                        <PatientAccardionDiseaseItem
                            diseases={this.props.diseases}
                            onAddChronic = {this.props.onAddChronic}
                            onDeleteChronic = {this.props.onDeleteChronic}
                        />
                    </Panel>
                </Accordion>
            </div>
        )
    }
}

export default PatientAccardionDisease
