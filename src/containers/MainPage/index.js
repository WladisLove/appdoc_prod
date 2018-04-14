import React from 'react'
import {connect} from 'react-redux';

import { Icon, Row, Col, TopPanel, TopPanelItem, TableNoHead, TableNoHeadItem, Reviews, TreatmentTable, NewVisitModalPage, CancelVisitModal } from 'appdoc-component'
import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'
import {dataArr, scheduleArr, treatmentArr, panelArr} from './mock-data'

class MainPage extends React.Component{
	state = {
		cancelModal: false,
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
										onBegin={() => this.props.history.push('/chat')}
										onCancel={() => {this.setState({cancelModal: true})}}
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
					<NewVisitModalPage visible={false}/>
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
		visits: state.schedules.visits,
		reviews: state.reviews.reviews,
		actualTreatments: state.treatments.actualTreatments,
		docTodayInfo: state.doctor.todayInfo,
    }
};

const mapDispatchToProps = dispatch => {
    return {
		onGetTodayVisits: (start, end) => dispatch(actions.getAllVisits(start, end)),
		onGetAllReviews: () => dispatch(actions.getAllReviews()),
		onGetActualTreatments: () => dispatch(actions.getActualTreatments()),
		onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
		getDocTodayInfo: () => dispatch(actions.getDocTodayInfo()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
