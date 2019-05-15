import React from 'react'
import { connect } from 'react-redux';
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
import { Modal } from 'antd';
import { Translate } from 'react-localize-redux'

class Patients extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            isLoadingPatientDoctors: true,
            isModalNewVisitVisible: false,
			id: null,
			name: "",
			searchName: "",
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
        this.props.onClearNotPatientDoctors();
    	this.setState({isModalAddNewDoctorVisible: true})
	};

	gotoHandler = (id) => {
		this.props.history.push('/app/doctor'+id);
	};

    componentWillMount() {
		this.props.onGetPatientDoctors();
    }

    handleDoctorsSearch = (name) => {
       this.setState({searchName: name});
       return this.props.onGetNotPatientDoctors(name);
	};
	addNewDoctor = (id) => {
        this.props.addDoctor(id, this.state.searchName)
	};
	onDeleteDoctorHandler = (id, patientName, translate) => {
		const {removeDoctor} = this.props;
        Modal.confirm({
            title: translate("modal.confirm.removeDoctor"),
            content: translate('modal.confirm.willBeRemovedFromListOfDoctors', {name: patientName}),
            width: '445px',
            okText: translate("yes"),
            cancelText: translate("no"),
            onOk() {
                removeDoctor(id);
            },
          });
	}
	componentWillReceiveProps(props) {
		if(!props.isLoadingPatientDoctors) {
			this.setState({isLoadingPatientDoctors: false})
		}
	}
    render(){
        return this.state.isLoadingPatientDoctors ? (
			<Spinner size="large"/>
	):(
        	<Hoc>
        		<Row>
        			<Col span={24}>
        				<h1 className='page-title'><Translate id="patient.myDoctors" /></h1>
        			</Col>
        		</Row>
				 <Row>
            		<Col xs={24} xxl={18}>
						<PatientDoctors
							data = {this.props.patientDoctors ? this.props.patientDoctors : []}
							addNewDoctorVisible={this.addNewDoctorVisible}
							newVisitVisible = {this.addNewVisitVisible}
							onDelete = {this.onDeleteDoctorHandler}
							onGoTo={this.gotoHandler}
						/>
            		</Col>
            	</Row>

                <NewVisitByPatientModal
                    visible={this.state.isModalNewVisitVisible}
                    date={+this.state.newVisit.timestamp}
                    isChoosebleTime={false}
                    onSave = {this.props.onSaveReceptionByPatient}
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
                    }}
					onClear={this.props.onClearNotPatientDoctors}
					onSearch={this.handleDoctorsSearch}
					onAdd={(id)=>this.addNewDoctor(id)}
					myDoctorsPage
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
		addDoctor: (id, name) => dispatch(actions.addDoctor(id, name)),
		removeDoctor: (id_doctor) => dispatch(actions.removeDoctor(id_doctor)),
        onSaveReceptionByPatient: (reception) => dispatch(actions.setReceptionByPatient(reception)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
