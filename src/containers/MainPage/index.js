import React from 'react'
import {connect} from 'react-redux';

import { Icon, Row, Col, TopPanel, TopPanelItem, TableNoHead, TableNoHeadItem, Reviews, TreatmentTable, NewVisitModal, CancelVisitModal } from 'appdoc-component'
import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'

class MainPage extends React.Component{
	state = {
		cancelModal: false,
		addModal: false,
	}

	componentDidMount(){
		this.props.reviews && !this.props.reviews.length && this.props.onGetAllReviews();
		this.props.onGetActualTreatments();
		let now = new Date();
		this.props.onGetTodayVisits(new Date(now.getFullYear(), now.getMonth(), now.getDate()),
										new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20));
		this.props.getDocTodayInfo();
	}

	gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
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
	
	/*shouldComponentUpdate(nextProps, nextState){
		return this.props.visits.length !== nextProps.visits.length
			|| this.props.docTodayInfo.receptionsToday !== nextProps.docTodayInfo.receptionsToday
			|| this.props.docTodayInfo.patients !== nextProps.docTodayInfo.patients
			|| this.state.cancelModal !== nextState.cancelModal
			|| this.state.addModal !== nextState.addModal
			|| this.props.patients.length !== nextProps.patients.length;
	}*/

    render(){
        return (
                <Hoc>
					<Row>
						<Col span={24} className='section'>
							<TopPanel  {...this.props.docTodayInfo}/>
						</Col>
					</Row>

					<Row>
						<Col xs={24} xxl={14} className='section'>
							<TableNoHead data={this.props.visits}
										onGoto={(val) => this.gotoHandler(val)}
										onBegin={(val) => {
											this.props.onSelectReception(val)
											this.props.history.push('/chat')
										}}
										onCancel={() => {this.setState({cancelModal: true})}}
										onAdd = {this.onAddVisit}
							/>
						</Col>
						<Col xs={24} xxl={10} className='section'>
							<Reviews data={this.props.reviews}
									 numToDisplay = {7}
									 onGoto={(val) => this.gotoHandler(val)}
									 onGotoChat={(id) => this.props.history.push('/chat')}
									 redirect={() => this.props.history.push('/reviews')}/>
						</Col>
					</Row>
					<Row>
						<Col span={24} className='section'>
							<TreatmentTable data={this.props.actualTreatments}

											onGoto={(id) => this.gotoHandler(id)}
											onGotoChat = {(id) => this.props.history.push('/chat')}

											redirect={() => this.props.history.push('/treatment')}/>
						</Col>
					</Row>
					<NewVisitModal visible={this.state.addModal}
									date={new Date()}
									isChoosebleTime={true}
									patients={this.props.patients}
									onCancel={() => {this.setState({addModal: false})}}
									onSave = {(obj) => this.onSaveNewVisit(obj)}
					/>
					<CancelVisitModal visible={this.state.cancelModal} 
									onGoto={() => {}}
									onCancel={() => {this.setState({cancelModal: false})}}
									onSave={() => {this.setState({cancelModal: false})}}
					/>
                </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
		patients: state.patients.docPatients,
		visits: state.schedules.visits,
		reviews: state.reviews.reviews,
		actualTreatments: state.treatments.actualTreatments,
		docTodayInfo: state.doctor.todayInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
		onGetDocPatients: () => dispatch(actions.getDocPatients()),
		onAddNewVisit: (obj) => dispatch(actions.addVisit(obj)),
		onSelectReception: (id) => dispatch(actions.seletVisit(id)),

		onGetTodayVisits: (start, end) => dispatch(actions.getTodayVisits(start, end)),
		onGetAllReviews: () => dispatch(actions.getAllReviews()),
		onGetActualTreatments: () => dispatch(actions.getActualTreatments()),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
		getDocTodayInfo: () => dispatch(actions.getDocTodayInfo()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
