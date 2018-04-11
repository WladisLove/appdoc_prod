import React from 'react'
import {connect} from 'react-redux';

import { Row, Col, ProfilePatient, DiseasesTable, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../hoc'

import {patientArr, diseasesArr, historyArr} from './mock-data'
import * as actions from '../../store/actions'

import './styles.css';

class PatientsPage extends React.Component{

    componentDidMount(){
        this.props.getPatientInfo();
    }

    render(){
        const {diseases = [], treatments = [], infoUser = {}} = this.props.info;

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
                            {...infoUser}
                            doctorType="врач-терапевт"
                            doctor="Тимошенко Т.И"
                            
                        />
            		</Col>
                    <Col xs={24} xxl={8} className='section'>
                        <DiseasesTable data={diseases}/>
                    </Col>
            	</Row>

                <Row> 
                    <Col span={24}>
                        <HistoryReceptions data={treatments}/>
                    </Col> 
                </Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
		info: state.patients.selectedPatientInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
		getPatientInfo: () => dispatch(actions.getSelectedPatientInfo()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);