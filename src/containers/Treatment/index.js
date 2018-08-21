import React from 'react'
import {connect} from 'react-redux';

import Row from "../../components/Row";
import Col from "../../components/Col";
import HistoryReceptionsTabs from "../../components/HistoryReceptionsTabs";

import Hoc from '../../hoc'

import * as actions from '../../store/actions'

import './styles.css'


class Treatment extends React.Component{

    componentDidMount(){
        this.props.onGetTreatments();
    }

    gotoHandler = (id) => {
		this.props.onSelectPatient(id);
		let link = this.props.mode==="user"?"doctor":"patient";
		this.props.history.push(link+id);
	}

    render(){
        return (
            <Hoc>
            	<Row>
            		<Col span={24} className='section'>
                        <HistoryReceptionsTabs data={this.props.treatments}
                                            onGoto={this.gotoHandler}
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