import React from 'react'
import {connect} from 'react-redux';

import { Icon, Row, Col, ChatDialogs } from 'appdoc-component'
import Hoc from '../../hoc'

import ChatCard from './ChatCard'

import * as actions from '../../store/actions'

import {dialogArr} from './mock-data'

class Chat extends React.Component{

    componentDidMount(){
        console.log('get visits')
        this.props.onGetTodayVisits()
    }
    componentWillMount(){
        //this.props.getTodayReceptions();
    }

    componentWillUnmount(){
        this.props.clearTodayReceptions();
    }

    gotoHandler = (id) => {
        console.log('patient id',id)
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
	}

    render(){
        console.log('visitInfo',this.props.visitInfo)
        const {id_user,name, id: visitId, contactLevel,comment,chat,avatar, status} = this.props.visitInfo;
        return (
            <Hoc>
                <Row>
                    <Col xs={24} xxl={7} className='section'>
                        <ChatDialogs  data={this.props.visits}
                                    onGotoChat = {id => this.props.onSelectReception(id)}
                                    onGoto = {(id) => this.gotoHandler(id)}
                        />
                    </Col>
                    <Col xs={24} xxl={17} className='section'>
                        <ChatCard 
                                    wsURL={'wss://178.172.235.105:8443/one2one'}
                                    mode={contactLevel}
                                    receptionId={visitId}

                                    //isEnded = {true}

                                    callerID = {this.props.id}
                                    user_mode = {this.props.user_mode}

                                    user_id = {+id_user}
                                    patientName = {name}
                                    online={status}

                                    completeReception = {this.props.completeReception}
                        />
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

const mapStateToProps = state =>{
    return {
        id: state.auth.id,
        user_mode: state.auth.mode,

        schedules: state.schedules.schedules,
        visits: state.schedules.visits,
        visitInfo: state.schedules.visitInfo,
    }
}

const mapDispatchToProps = dispatch => {
	return {
        completeReception: (obj) => dispatch(actions.completeReception(obj)),
        //getTodayReceptions: () => dispatch(),
        onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        onSelectReception: (id) => dispatch(actions.seletVisit(id)),
        clearTodayReceptions: () => dispatch(actions.clearIntervals()),
        onGetTodayVisits: (start, end) => dispatch(actions.getTodayVisits(start, end)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);