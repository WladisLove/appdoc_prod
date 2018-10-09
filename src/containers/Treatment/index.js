import React from 'react'
import {connect} from 'react-redux';

import Row from "../../components/Row";
import Col from "../../components/Col";
import HistoryReceptionsTabs from "../../components/HistoryReceptionsTabs";

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'


class Treatment extends React.Component{
    state = {
        cancelModal: false,
        addModal: false,
        isNewFreeVisitVisible: false,
    };


    gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		let link = this.props.mode==="user"?"/app/doctor":"/app/patient";
		this.props.history.push(link+id);
	};



    render(){
        return (
            <Hoc>
            	<Row>
            		<Col span={24} className='section'>
                        <HistoryReceptionsTabs
                            getTreatments = {this.props.onGetTreatments}
                            data={this.props.treatments}
                            onGoto={this.gotoHandler}
                            isUser={this.props.mode === "user"}
                            onGotoChat = {(id) => {
                                this.props.onSelectTretment(id);
                                this.props.history.push('/app/chat');
                            }}
                            treatmentsCount ={this.props.treatmentsCount}
                            onSubmit={this.props.makeReview}
                            onAddFiles = {this.props.onAddFiles}
                            addConclusion = {this.props.addConclusion}
                        />
            		</Col>
            	</Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
	return {
        mode: state.auth.mode,
        treatments: state.treatments.treatments,
        treatmentsCount: state.treatments.treatmentsCount
	}
};

const mapDispatchToProps = dispatch => {
	return {
        onGetTreatments: (obj) => dispatch(actions.getPaginationTreatments(obj)),
        onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        onSelectTretment: (id) => dispatch(actions.selectTreatment(id)),
        makeReview: (obj) => dispatch(actions.makeReview(obj)),
        onAddFiles: (file, id) => dispatch(actions.addFileToApp(file, id)),
        addConclusion:(id_zap, file) => dispatch(actions.uploadConclusion(id_zap, file))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);
