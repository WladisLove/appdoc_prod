import React from 'react'
import {connect} from 'react-redux';
import moment from 'moment'
import Row from "../../components/Row";
import Col from "../../components/Col";
import Hoc from '../../hoc'
import * as actions from '../../store/actions'
import './styles.css';
import PatientDoctors from "../../components/PatientDoctors";
import AddNewDoctor from "../../components/AddNewDoctor";
import NewVisitByPatientModal from "../../components/NewVisitByPatientModal";
import Spinner from "../../components/Spinner";

class Patients extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			addNew_show: false,
            isModalNewVisitVisible: false,
			id: null,
			name: "",
			isModalAddNewDoctorVisible: false,
			newVisit: {
				time: moment(),
				type: "chat",
				name: ""
			}
        }
    }

	addNewVisitVisible = (isModalNewVisitVisible, id, name) => {
        this.setState({isModalNewVisitVisible, id, name});
	};
    addNewDoctorVisible = () => {
    	this.setState({isModalAddNewDoctorVisible: true})
	};
    onChangeDate = (date) => {
        let beginDay = moment(date),
            endDay = moment(date);

        beginDay.startOf('date');
        endDay.endOf('date');
        this.props.onGetIntervalForDate(beginDay.format('X'), endDay.format('X'));
    };

	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patient'+id);
	};
    //
	// componentDidMount(){
	// 	this.props.onGetPatientDoctors();
	// }

    componentWillMount() {
		this.props.onGetPatientDoctors();
    }

    showModalHandler = () => {
		this.setState({addNew_show: true});
	};

	getInterval = () => {
		let intervals = [];

		const arr = this.props.intervals;
		for(let i = 0; arr && i < arr.length; i++){
			for(let j = 0; j < arr[i].intervalOb.length; j++){
				intervals.push({from: (+arr[i].intervalOb[j].start)*1000, to: (+arr[i].intervalOb[j].end)*1000, type: (arr[i].type)});
			}
		}
		return intervals;
	};

    render(){
	let availableArea = this.getInterval();
        return this.props.isLoadingPatientDoctors ? (
			<Spinner size="large"/>
	):(
        	<Hoc>
        		<Row>
        			<Col span={24}>
        				<h1 className='page-title'>Мои врачи</h1>
        			</Col>
        		</Row>
            	<Row>
            		<Col xs={24} xxl={18}>
						<PatientDoctors
							data = {this.props.patientDoctors ? this.props.patientDoctors : []}
							addNewDoctorVisible={this.addNewDoctorVisible}
							newVisitVisible = {this.addNewVisitVisible}
						/>
            		</Col>
            	</Row>

                <NewVisitByPatientModal
                    visible={this.state.isModalNewVisitVisible}
                    // userName='Петров-Иванов Александр Константинович'
                    date={this.state.newVisit.time}
                    isChoosebleTime={false}
                    onSave = {(obj) => console.log(obj)}
                    doctorName = {this.state.newVisit.doctorName}
                    type = {this.state.newVisit.type}
                    onCancel={() => this.setState({isModalNewVisitVisible: false})}
                />
                <AddNewDoctor
                    data={this.props.notPatientDoctors}
                    visible={this.state.isModalAddNewDoctorVisible}
                    onCancel={() => {
                        this.setState({isModalAddNewDoctorVisible: false});
                        this.props.onClearNotPatientDoctors();
                    }}
					onSearch={(name)=>this.props.onGetNotPatientDoctors(name)}
                    onAdd={(id)=>this.props.addDoctor(id)}
                />
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
	return {
        isLoadingPatientDoctors: state.patients.isLoadingPatientDoctors,
		patientDoctors: state.patients.patientDoctors,
        notPatientDoctors: state.patients.notPatientDoctors,
		intervals: state.patients.intervals,
		isReceptionRecorded: state.patients.isReceptionRecorded
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onGetPatientDoctors: () => dispatch(actions.getPatientDoctors()),
		onGetNotPatientDoctors: (name) => dispatch(actions.getNotPatientDoctors(name)),
		onClearNotPatientDoctors: () => dispatch(actions.clearNotPatientDoctors()),
		addDoctor: (id) => dispatch(actions.addDoctor(id, "")), //нужно что то сделать со вторым параметром
		removePatient: (id_user, id_doctor) => dispatch(actions.removePatient(id_user, id_doctor)),
		onSendMessage: (message) => dispatch(actions.sendMessage(message)),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
		onGetIntervalForDate: (beginDay, endDay) => dispatch(actions.getDateIntervalWithoutMakingApp(beginDay, endDay)),
        onSaveReception: (reception) => dispatch(actions.setReception(reception)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
