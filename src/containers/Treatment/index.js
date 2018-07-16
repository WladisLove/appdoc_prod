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
        //console.log('here');
        this.props.onGetTreatments();
        /*axios.get('https://178.172.235.105/~api/json/catalog.doc2/getTreatmentsByDoctorId/id/2732')
            .then(rez => {
                console.log(rez);
                this.setState({treatments: rez.data})
            })
            .catch(err => console.log(err))*/
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