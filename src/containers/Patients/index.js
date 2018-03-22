import React from 'react'
import axios from 'axios'
import { Icon, Row, Col, PatientTable, AddNewPatient } from 'appdoc-component'
import Hoc from '../../hoc'

import {patientArr} from './mock-data'
import './styles.css';

class Patients extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visible: false,
			patients: [],
		}
	}
	componentDidMount(){
			console.log('here')
			axios.get('http://178.172.235.105/~api/json/catalog.doc2/getPatientsByDoctorId/id/2732')
				.then(rez => {
					console.log(rez);
					this.setState({patients: rez.data})
				})
				.catch(err => console.log(err))
		
	}

    render(){


        return (
        	<Hoc>
        		<Row>
        			<Col span={24}>
        				<h1 className='page-title'>Отзывы пациентов</h1>
        			</Col>
        		</Row>
            	<Row>
            		<Col xs={24} xxl={18}>
            			<PatientTable countPatient='9' data={this.state.patients}/>
            		</Col>
            	</Row>
				<AddNewPatient data={this.state.patients} 
							visible={false} 
							onAdd={(obj)=>console.log('eee',obj)}t/>
            </Hoc>
        )
    }
}

export default Patients;