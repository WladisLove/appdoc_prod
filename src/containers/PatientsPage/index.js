import React from 'react'
import { Row, Col, ProfilePatient, DiseasesTable, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../hoc'

import {patientArr, diseasesArr, historyArr} from './mock-data'
import './styles.css';

class PatientsPage extends React.Component{

    render(){


        return (
        	<Hoc>
        		<Row>
        			<Col span={24}>
        				<h1 className='page-title'>Профиль пациента</h1>
        			</Col>
        		</Row>
            	<Row>
            		<Col xs={24} xxl={16} className='section'>
            			<ProfilePatient
                            secondname="Петров-Иванов"
                            firstname="Александр"
                            patronymic="Константинович"
                            img="https://24smi.org/public/media/resize/660x-/person/2017/10/25/cdRRFH0JWoYv_supermen.jpg"
                            lastDate="01.01.2000"
                            doctorType="врач-терапевт"
                            doctor="Тимошенко Т.И"
                            birthday="31.12.1999"
                            age="18"
                            height="187"
                            weight="85"
                        />
            		</Col>
                    <Col xs={24} xxl={8} className='section'>
                        <DiseasesTable data={diseasesArr}/>
                    </Col>
            	</Row>

                <Row> 
                    <Col span={24}>
                        <HistoryReceptions data={historyArr}/>
                    </Col> 
                </Row>
            </Hoc>
        )
    }
}

export default PatientsPage;