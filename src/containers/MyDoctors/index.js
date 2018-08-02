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

	addNewVisitVisible = (isModalNewVisitVisible, id, name, timestamp, type) => {
        this.setState({isModalNewVisitVisible, newVisit: {id,name,timestamp,type}});
	};

    addNewDoctorVisible = () => {
    	this.setState({isModalAddNewDoctorVisible: true})
	};

	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patient'+id);
	};

    componentWillMount() {
		this.props.onGetPatientDoctors();
    }


    render(){
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
                    date={+this.state.newVisit.timestamp}
                    isChoosebleTime={false}
                    onSave = {(obj) => {
                        this.props.onSaveReceptionByPatient(obj);
                        this.props.onGetPatientDoctors();
                        this.setState({isModalNewVisitVisible: false})
                    }}
                    doctorName = {this.state.newVisit.name}
                    type = {this.state.newVisit.type}
                    onCancel={() => this.setState({isModalNewVisitVisible: false})}
                    docId={this.state.newVisit.id}
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
		addDoctor: (id) => dispatch(actions.addDoctor(id)),
		removePatient: (id_user, id_doctor) => dispatch(actions.removePatient(id_user, id_doctor)),
        onSaveReceptionByPatient: (reception) => dispatch(actions.setReceptionByPatient(reception)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
