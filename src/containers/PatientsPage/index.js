import React from 'react'
import {connect} from 'react-redux';

import { Row, Col, ProfilePatient, DiseasesTable, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../hoc'

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
                            onAdd={(id) => this.props.addPatient(id)}
                            id={this.props.id_user}                           
                        />
            		</Col>
                    <Col xs={24} xxl={8} className='section'>
                        <DiseasesTable data={diseases}/>
                    </Col>
            	</Row>

                <Row> 
                    <Col span={24}>
                        <HistoryReceptions data={treatments}
                                            onGotoChat = {(id) => this.props.history.push('/chat')}/>
                    </Col> 
                </Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        info: state.patients.selectedPatientInfo,
        id_user: state.patients.selectedId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getPatientInfo: () => dispatch(actions.getSelectedPatientInfo()),
        addPatient: (id) => dispatch(actions.addPatient(id, '', true))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);