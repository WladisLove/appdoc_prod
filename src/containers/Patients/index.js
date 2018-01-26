import React from 'react'
import { Icon, Row, Col, PatientTable } from 'appdoc-component'
import Hoc from '../../hoc'

import {patientArr} from './mock-data'
import './styles.css';

class Patients extends React.Component{

    render(){


        return (
        	<Hoc>
        		<Row>
        			<Col span={18}>
        				<h1 className='page-title'>Отзывы пациентов</h1>
        			</Col>
        		</Row>
            	<Row>
            		<Col span={18}>
            			<PatientTable countPatient='9' data={patientArr}/>
            		</Col>
            	</Row>
            </Hoc>
        )
    }
}

export default Patients;