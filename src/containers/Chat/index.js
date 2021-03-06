import React from 'react'
import { connect } from 'react-redux';
import Row from '../../components/Row'
import Col from '../../components/Col'
import ChatDialogs from "../../components/ChatDialogs";
import Hoc from '../../hoc'

import ChatCard from './ChatCard'

import * as actions from '../../store/actions'

import './styles.css';

function setCardVideoSize(){
    let videos = document.getElementsByClassName('reception-video-wrapper');
    let areas = document.getElementsByClassName('chat-card-body');
    if(areas.length){
        if(videos.length){
            videos[0].style.width = areas[0].offsetWidth+'px'
            videos[0].style.height = areas[0].offsetHeight+'px'
        }
    }
}


class Chat extends React.Component {
    state = {
        displayChat: true //TO DO make it false and just display for selected user
    }

    componentDidMount() {
        this.props.onGetTodayVisits();
        
        setCardVideoSize()
        window.addEventListener("resize", function() {
            setCardVideoSize()
        }, false);
    }
    componentWillMount() {
        //this.props.getTodayReceptions();
    }

    componentWillUnmount() {
        this.props.clearTodayReceptions();
        !this.props.isCalling && this.props.clearSelectionsTRandVIS();
    }

    render() {
        //console.log('visitInfo',this.props.visitInfo)
        //console.log('treatInfo',this.props.treatInfo)
        let id_user, id_doc, name, name_doc, avatar, name_user, status, avatar_doc, chat, visitId, contactLevel, comment, id_treatment;

        this.props.fromTR_VIS === 1 ? (
            { id_user, name_user: name, avatar, name_doc, contactLevel, name_user, avatar_doc, status, chat, id_treatment } = this.props.treatInfo
        ) : (
                { id_user, id_doc, name, name_doc, id: visitId, contactLevel, comment, chat, avatar, avatar_doc, status, id_treatment } = this.props.visitInfo
            )
        const isUser = this.props.user_mode === "user";

        const chatProps = {
            wsURL: 'wss://appdoc.by:8443/one2one',
            // wsURL: 'wss://localhost:8443/one2one',
            id: +id_user,
            callback: this.props.callback,
            clearCallback: this.props.clearCallback,
            timer: this.props.timer,
            chatStory: this.props.chatStory,
            receptionStarts: this.props.receptionStarts,
            isCalling: this.props.isCalling,
            receptionId: visitId,
            callerID: this.props.id,
            calledID: isUser ? id_doc : id_user,
            user_mode: this.props.user_mode,
            user_id: +id_user,      
            patientName: isUser ? name_doc : name,
            id_treatment,
            online: +status,
            avatar: isUser ? avatar_doc : avatar,
            chat,
            comment,
            uploadFile: this.props.uploadFile,
            setReceptionStatus: this.props.setReceptionStatus,
            setChatToId: this.props.setChatToId,
            uploadConclusion: this.props.uploadConclusion,
            getAllFilesTreatment: this.props.getAllFilesTreatment,
            treatmFiles: this.props.treatmFiles,
            appShouldStartAt: this.props.visitInfo.date,
            getPatientLocation: this.props.getPatientLocation,
            patientLocation: this.props.patientLocation,
            toggleFilesArea: this.props.toggleFilesArea,
            isFilesAreaActive: this.props.isFilesAreaActive,
        }

        return (
            <div className='chat-row'>

                {this.state.displayChat && <div className='chat-col-mediaArea'>
                    {
                        isUser ? (
                            <ChatCard {...chatProps}
                                mode={contactLevel}
                                //isEnded = {true}
                                onSelectReception={this.props.onSelectReception}
                                completeReception={this.props.completeReception}
                                closeTreatm={this.props.closeTreatment}
                                status={this.props.status}
                                fromTR_VIS={2}
                                isUser={true}
                            />
                        ) : (
                                <ChatCard {...chatProps}
                                    mode={contactLevel}
                                    //isEnded = {true}
                                    onSelectReception={this.props.onSelectReception}
                                    changeReceptionStatus={this.props.changeReceptionStatus}
                                    completeReception={this.props.completeReception}
                                    closeTreatm={this.props.closeTreatment}
                                    uploadConclusion={this.props.uploadConclusion}
                                    fromTR_VIS={this.props.fromTR_VIS}
                                    status={this.props.status} />
                            )
                    }
                </div>
                }
                {
                    !isUser && (<div className='chat-col-dialogs'>
                        <ChatDialogs data={this.props.visits}
                            onGotoChat={id => {
                                this.props.onSelectReception(id);
                                this.props.openChatArea();
                                this.setState({ displayChat: true })
                            }
                            }
                        />
                    </div>)
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.auth.id,
        user_mode: state.auth.mode,

        schedules: state.schedules.schedules,
        visits: state.schedules.visits,
        visitInfo: state.treatments.visitInfo,
        treatInfo: state.treatments.treatInfo,
        treatmFiles: state.treatments.treatmFiles,
        fromTR_VIS: state.treatments.from,

        callback: state.treatments.callback,

        chatStory: state.chatWS.chatStory,
        receptionStarts: state.chatWS.receptionStarts,
        isCalling: state.chatWS.isCalling,
        timer: state.chatWS.timer,
        status: state.chatWS.status,
        patientLocation: state.chatWS.patientLocation,
        isFilesAreaActive: state.chatState.isFilesArea,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeReception: (obj) => dispatch(actions.completeReception(obj)),
        closeTreatment: (id) => dispatch(actions.closeTreatment(id)),
        onSelectReception: (id) => dispatch(actions.seletVisit(id)),
        clearTodayReceptions: () => dispatch(actions.clearIntervals()),
        onGetTodayVisits: (start, end) => dispatch(actions.getTodayVisits(start, end)),
        clearSelectionsTRandVIS: () => dispatch(actions.clearSelections()),
        uploadFile: (id_zap, id_user, file, callback) => dispatch(actions.uploadChatFile(id_zap, id_user, file, callback)),
        uploadConclusion: (id_zap, file, callback) => dispatch(actions.uploadConclusion(id_zap, file, callback)),
        getAllFilesTreatment: (treatmId) => dispatch(actions.getAllFilesTreatment(treatmId)),
        changeReceptionStatus: (id, key) => dispatch(actions.changeReceptionStatus(id, key)),
        getReceptionDuration: (id) => dispatch(actions.getReceptionDuration(id)),

        setReceptionStatus: (isStart) => dispatch(actions.setReceptionStatus(isStart)),
        setChatToId: (id) => dispatch(actions.setChatToId(id)),
        clearCallback: () => dispatch(actions.clearCallback()),
        getPatientLocation: (id) => dispatch(actions.getPatientLocation(id)),
        openChatArea: () => dispatch(actions.setChatAreaActive()),
        toggleFilesArea: () => dispatch(actions.toggleFilesArea()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
