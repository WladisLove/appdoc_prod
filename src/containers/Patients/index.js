import React from 'react'
import {connect} from 'react-redux';

import { Icon, Row, Col, PatientTable, AddNewPatient } from 'appdoc-component'
import Hoc from '../../hoc'

import {patientArr} from './mock-data'
import * as actions from '../../store/actions'

import './styles.css';

class Patients extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addNew_show: false,
		}
	}

	componentDidMount(){
		this.props.onGetDocPatients();		
	}

    render(){
		console.log(this.props.patients)


        return (
        	<Hoc>
        		<Row>
        			<Col span={24}>
        				<h1 className='page-title'>Мои пациенты</h1>
        			</Col>
        		</Row>
            	<Row>
            		<Col xs={24} xxl={18}>
						<PatientTable countPatient='9' 
										data={this.props.patients}
										onSearch = {(val) => console.log(val)}
										onAdd = {() => this.setState({addNew_show: true})}
										
										onNewVisit={(val) => console.log(val)}
										onNewMessage = {(val) => console.log(val)}
										onDelete = {(val) => console.log(val)}
										/>
            		</Col>
            	</Row>
				<AddNewPatient data={this.props.patients} 
							visible={this.state.addNew_show} 
							onCancel={() => this.setState({addNew_show: false})}
							onSearch = {(val) => console.log(val)}
							onAdd={(obj)=>console.log('eee',obj)}/>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
	return {
		patients: state.patients.patients,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetDocPatients: () => dispatch(actions.getDoctorsPatients()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);