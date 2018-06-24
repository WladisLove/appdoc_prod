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
		let date1 =  moment(date);
		let date2 = moment(date);
		date1.startOf('date');
		let beginDay = date1;
		date2.endOf('date');
		let endDay = date2;
		console.log("eeDay", beginDay, endDay);

		this.props.onGetIntervalForDate(beginDay.format('X'), endDay.format('X'));
	}
	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
	}
	componentDidMount(){
		this.props.onGetDocPatients();	


		// this.onChangeDate

		// this.props.onGetIntervalForDate(1525122000);
	}

	showModalHandler = () => {
		//this.props.onGetNotDocPatients();
		this.setState({addNew_show: true});
	}

	getInterval = () => {
		let intervals = [];
		const arr = this.props.intervals;
		
		for(let i = 0; arr && i < arr.length; i++){
			for(let j = 0; j < arr[i].intervalOb.length; j++){

				intervals.push({from: (+arr[i].intervalOb[j].start)*1000, to: (+arr[i].intervalOb[j].end)*1000});
			}
		}
		return intervals;
	}

    render(){

		let availableArea = this.getInterval();
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
										availableArea={availableArea}

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
		intervals: state.patients.intervals,
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
		onGetIntervalForDate: (beginDay, endDay) => dispatch(actions.getDateInterval(beginDay, endDay)),
		
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);