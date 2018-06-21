import React from 'react'
import {connect} from 'react-redux';

import { Row, Col, ChatDialogs } from 'appdoc-component'
import Hoc from '../../hoc'

import ChatCard from './ChatCard'

import * as actions from '../../store/actions'

class Chat extends React.Component{

    componentDidMount(){
        this.props.onGetTodayVisits();
    }
    componentWillMount(){
        //this.props.getTodayReceptions();
    }

    componentWillUnmount(){
        this.props.clearTodayReceptions();
        this.props.clearSelectionsTRandVIS();

    }

    gotoHandler = (id) => {
        console.log('patient id',id)
		this.props.onSelectPatient(id);
		this.props.history.push('/patients-page');
	}

    render(){
        console.log('visitInfo',this.props.visitInfo)
        console.log('treatInfo',this.props.treatInfo)
        let  id_user, name, avatar, status, chat, visitId, contactLevel, comment, id_treatment;
        

        this.props.fromTR_VIS === 1 ? (
            {id_user,name_user: name, avatar, status, chat} = this.props.treatInfo
        ) : (
            {id_user,name, id: visitId, contactLevel,comment, chat, avatar, status, id_treatment} = this.props.visitInfo
        )
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
                        {
                            this.props.user_mode === "user" ? (
                                <ChatCard 
                                    wsURL={'wss://178.172.235.105:8443/one2one'}
                                    mode={contactLevel}
                                    receptionId={visitId}

                                    //isEnded = {true}

                                    callerID = {this.props.id}
                                    user_mode = {this.props.user_mode}

                                    user_id = {+id_user}
                                    patientName = {name}
                                    id_treatment = {id_treatment}
                                    online={status}
                                    chat={chat}
                                    comment={comment}

                                    completeReception = {this.props.completeReception}
                                    closeTreatm = {this.props.closeTreatment}
                                    fromTR_VIS = {2}/>
                            ) : (
                                <ChatCard 
                                    wsURL={'wss://178.172.235.105:8443/one2one'}
                                    mode={contactLevel}
                                    receptionId={visitId}

                                    //isEnded = {true}

                                    callerID = {this.props.id}
                                    user_mode = {this.props.user_mode}

                                    user_id = {+id_user}
                                    patientName = {name}
                                    id_treatment = {id_treatment}
                                    online={status}
                                    chat={chat}
                                    comment={comment}

                                    completeReception = {this.props.completeReception}
                                    closeTreatm = {this.props.closeTreatment}
                                    fromTR_VIS = {this.props.fromTR_VIS}/>
                            )
                        }
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
        visitInfo: state.treatments.visitInfo,
        treatInfo: state.treatments.treatInfo,
        fromTR_VIS: state.treatments.from,
    }
}

const mapDispatchToProps = dispatch => {
	return {
        completeReception: (obj) => dispatch(actions.completeReception(obj)),
        closeTreatment: (id) => dispatch(actions.closeTreatment(id)),
        //getTodayReceptions: () => dispatch(),
        onSelectPatient: (id) => dispatch(actions.selectPatient(id)),
        onSelectReception: (id) => dispatch(actions.seletVisit(id)),
        clearTodayReceptions: () => dispatch(actions.clearIntervals()),
        onGetTodayVisits: (start, end) => dispatch(actions.getTodayVisits(start, end)),
        clearSelectionsTRandVIS: () => dispatch(actions.clearSelections()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);