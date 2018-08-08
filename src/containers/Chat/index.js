import React from 'react'
import {connect} from 'react-redux';
import Row from '../../components/Row'
import Col from '../../components/Col'
import ChatDialogs from "../../components/ChatDialogs";
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

    render(){
        //console.log('visitInfo',this.props.visitInfo)
        //console.log('treatInfo',this.props.treatInfo)
        let  id_user, name, name_doc, avatar, status, chat, visitId, contactLevel, comment, id_treatment;

        this.props.fromTR_VIS === 1 ? (
            {id_user,name_user: name, avatar, status, chat} = this.props.treatInfo
        ) : (
            {id_user,name, name_doc, id: visitId, contactLevel,comment, chat, avatar, status, id_treatment} = this.props.visitInfo
        )  
        const isUser = this.props.user_mode === "user";   

        return (
            <Hoc>
                <Row>
                    {
                        !isUser && (<Col xs={24} xxl={7} className='section'>
                            <ChatDialogs  data={this.props.visits}
                                        onGotoChat = {id => this.props.onSelectReception(id)}
                            />
                        </Col>)
                    }
                    <Col xs={24} xxl={17} className='section'>
                        {
                             isUser ? (
                                <ChatCard 
                                    wsURL={'wss://localhost:8443/one2one'}
                                    mode={"video"}
                                    //mode={contactLevel}
                                    receptionId={visitId}

                                    //isEnded = {true}

                                    callerID = {this.props.id}
                                    user_mode = {this.props.user_mode}

                                    user_id = {+id_user}
                                    patientName = {name_doc}
                                    id_treatment = {id_treatment}
                                    online={status}
                                    chat={chat}
                                    comment={comment}

                                    onSelectReception={this.props.onSelectReception}
                                    completeReception = {this.props.completeReception}
                                    closeTreatm = {this.props.closeTreatment}
                                    fromTR_VIS = {2}/>
                            ) : (
                                <ChatCard 
                                    wsURL={'wss://localhost:8443/one2one'}
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

                                    onSelectReception={this.props.onSelectReception}
                                    completeReception = {this.props.completeReception}
                                    closeTreatm = {this.props.closeTreatment}
                                    uploadFile={this.props.uploadFile}
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
        onSelectReception: (id) => dispatch(actions.seletVisit(id)),
        clearTodayReceptions: () => dispatch(actions.clearIntervals()),
        onGetTodayVisits: (start, end) => dispatch(actions.getTodayVisits(start, end)),
        clearSelectionsTRandVIS: () => dispatch(actions.clearSelections()),
        uploadFile: (file) => dispatch(actions.uploadChatFile(file)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);