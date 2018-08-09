import React from 'react'
import {connect} from 'react-redux';

import DoctorPage from "./DoctorPage"
import PatientPage from "./PatientPage"

import * as actions from '../../store/actions'

import './styles.css'

class MainPage extends React.Component{
	state = {
		cancelModal: false,
		addModal: false,
        isNewFreeVisitVisible: false
	}

	componentDidMount(){
		if (this.props.mode === "user"){
			this.props.onGetPatientDoctors(2);
			this.props.onGetCompletedTreatments();
            this.props.onGetNearVisits(4);
		}
		else {
			this.props.reviews && !this.props.reviews.length && this.props.onGetAllReviews();
			this.props.onGetActualTreatments();
			let now = new Date();
			this.props.onGetTodayVisits(new Date(now.getFullYear(), now.getMonth(), now.getDate()),
											new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20));
			this.props.getDocTodayInfo();
		}
		
	}

	onAddVisit = () => {
		this.props.onGetDocPatients();
		this.setState({addModal: true});
		let now = new Date();
		this.props.onGetTodayVisits(new Date(now.getFullYear(), now.getMonth(), now.getDate()),
										new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20));
		this.props.getDocTodayInfo();
	}

	onSaveNewVisit = (obj) => {
        this.props.onAddNewVisit(obj);
        this.setState({
            addModal: false,
        })
	};

	onNewFreeVisit = () => {
	    this.setState({isNewFreeVisitVisible: true})
}
	/*shouldComponentUpdate(nextProps, nextState){
		return this.props.visits.length !== nextProps.visits.length
			|| this.props.docTodayInfo.receptionsToday !== nextProps.docTodayInfo.receptionsToday
			|| this.props.docTodayInfo.patients !== nextProps.docTodayInfo.patients
			|| this.state.cancelModal !== nextState.cancelModal
			|| this.state.addModal !== nextState.addModal
			|| this.props.patients.length !== nextProps.patients.length;
	}*/

    render(){
        return (this.props.mode === "user") ? (
			<PatientPage
				isUser = {this.props.mode === "user"}
				doctors = {this.props.patientDoctors}
				completedTreatments = {this.props.completedTreatments}
				nearVisits = {this.props.nearVisits}
                nearVisitsLoaded={this.props.nearVisitsLoaded}
				{...this.props}
                isNewFreeVisitVisible = {this.state.isNewFreeVisitVisible}
                onCancel = {()=>this.setState({isNewFreeVisitVisible: false })}
                onFreeVisit = {this.onNewFreeVisit}

			/>
		) : (
			<DoctorPage 
				showCancel = {() => {this.setState({cancelModal: true})}}
				onAdd = {this.onAddVisit}
				addModal = {this.state.addModal}
				closeAdd= {() => {this.setState({addModal: false})}}
				onSaveNewVisit = {this.onSaveNewVisit}
				cancelModal ={this.state.cancelModal}
				closeCancel= {() => {this.setState({cancelModal: false})}}
				saveCancel = {() => {}}
				{...this.props}/>
		)
    }
}

const mapStateToProps = state => {
    return {
		mode: state.auth.mode,
		patients: state.patients.docPatients,
		visits: state.schedules.visits,
		reviews: state.reviews.reviews,
		actualTreatments: state.treatments.actualTreatments,
		completedTreatments: state.treatments.completedTreatments,
		docTodayInfo: state.doctor.todayInfo,
        patientDoctors: state.patients.patientDoctors,
		nearVisits: state.schedules.nearVisits,
		nearVisitsLoaded: state.schedules.nearVisitsLoaded,
        intervals: state.patients.intervals,
        availableIntervals: state.profileDoctor.workIntervals,
    }
};

const mapDispatchToProps = dispatch => {
    return {
		onGetDocPatients: () => dispatch(actions.getDocPatients()),
		onAddNewVisit: (obj) => dispatch(actions.addVisit(obj)),
		onSelectReception: (id) => dispatch(actions.seletVisit(id)),
		onSelectTretment: (id) => dispatch(actions.selectTreatment(id)),
		onGetTodayVisits: (start, end) => dispatch(actions.getTodayVisits(start, end)),
		onGetAllReviews: () => dispatch(actions.getAllReviews()),
		onGetActualTreatments: () => dispatch(actions.getActualTreatments()),
		onGetCompletedTreatments: () => dispatch(actions.getCompletedTreatments()),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
		onGetNearVisits: (count) => dispatch(actions.getCountNearVisits(count)),
		onGetAllPatientsVisits: () => dispatch(actions.getAllVisits()),
		getDocTodayInfo: () => dispatch(actions.getDocTodayInfo()),
		onGetPatientDoctors: (count) => dispatch(actions.getPatientDoctors(count)),
        onGetIntervalForDate: (beginDay, endDay, id) => dispatch(actions.getDateIntervalWithoutMakingApp(beginDay, endDay, id)),
        onGetAllDocIntervals: (id) => dispatch(actions.getAllDocIntervals(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
