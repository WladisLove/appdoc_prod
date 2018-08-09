import React from 'react'
import {connect} from 'react-redux';

import {Row, Col, HistoryReceptionsTabs} from "appdoc-component";

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'


class Treatment extends React.Component{

    componentDidMount(){
        this.props.onGetTreatments();
    }

    gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		this.props.history.push('/patient'+id);
	}

    render(){
        return (
            <Hoc>
            	<Row>
            		<Col span={24} className='section'>
                        <HistoryReceptionsTabs data={this.props.treatments}
                                            onGoto={(id) => this.gotoHandler(id)}
                                            onGotoChat = {(id) => {
                                                this.props.onSelectTretment(id);
                                                this.props.history.push('/chat');
                                            }}
                                               isUser={this.props.mode === "user"}
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
	}
};

const mapDispatchToProps = dispatch => {
	return {
        onGetTreatments: () => dispatch(actions.getAllTreatments()),
        onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        onSelectTretment: (id) => dispatch(actions.selectTreatment(id)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Treatment);