import React from 'react'
import {connect} from 'react-redux';
import moment from 'moment'

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

	onChangeDate = (date) => {
		console.log(date);// отдать год-месяц-день и отправляем на сервер
		// this.props.onGetIntervalForDate(date);
	}
	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
	}
	componentDidMount(){
		this.props.onGetDocPatients();	

		// this.onChangeDate
		
		// let date =  moment(1524111050);
		// let date2 = moment(1524111050);
		// console.log("date",date)
		// date.startOf('date');
		// let beginDay = date;
		// date2.endOf('date');
		// let endDay = date2;
		// console.log("eeDay", beginDay, endDay);

		// this.props.onGetIntervalForDate(1525122000);
	}

	showModalHandler = () => {
		//this.props.onGetNotDocPatients();
		this.setState({addNew_show: true});
	}

    render(){
		console.log("patients", this.props.docPatients);
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
										data={this.props.docPatients}
										onSearch = {(val) => console.log(val)}
										onAdd = {this.showModalHandler}
										availableArea={[
											{
												from : 1395985227000,
												to   : 1395990227000
											}]}

										onChangeDate={this.onChangeDate}

										onGoto={(id) => this.gotoHandler(id)}
										onNewVisit={(val) => console.log(val)}
										onNewMessage = {(val) => this.props.onSendMessage(val)}
										onDelete = {(val) => this.props.removePatient(val)}
										/>
            		</Col>
            	</Row>
				<AddNewPatient data={this.props.notDocPatients} 
							visible={this.state.addNew_show} 
							onCancel={() => {
								this.setState({addNew_show: false});
								this.props.onClearNotDocPatients();
							}}
							onSearch = {(name) => this.props.onGetNotDocPatients(name)}
							onAdd={(id)=>this.props.addPatient(id)}/>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
	return {
		docPatients: state.patients.docPatients,
		notDocPatients: state.patients.notDocPatients,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetDocPatients: () => dispatch(actions.getDocPatients()),
		onGetNotDocPatients: (name) => dispatch(actions.getNotDocPatients(name)),
		onClearNotDocPatients: () => dispatch(actions.clearNotDocPatients()),
		addPatient: (id, name) => dispatch(actions.addPatient(id, name)),
		removePatient: (id_user, id_doctor) => dispatch(actions.removePatient(id_user, id_doctor)),
		onSendMessage: (message) => dispatch(actions.sendMessage(message)),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
		onGetIntervalForDate: (date) => dispatch(actions.getDateInterval(date)),
		
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);