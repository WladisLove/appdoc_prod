import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux';

import Hoc from '../../hoc'
import {
    Row, Col, Button,
    Calendar, SmallCalendar,
    CancelVisitModal, NewVisitModal, NewMessageModal, ReceptionsScheduleModal
} from 'appdoc-component'

import * as actionType from '../../store/actions/actionTypes'
import * as actions from '../../store/actions'

import './styles.css'

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditorMode: false,
            currentDate: new Date(),
            newVisitModal: false,
            newVisitData: {
                date: null,
                patients: [],
            },
            newMessageModal: false,
            receptionsScheduleModal: false,
            receptionData: {
                dates: [],
                currentSched: {},
            }
        }
    };

    dateChangeHandler = (date) => {
        this.setState({
            currentDate: date,
        })
    };

    onEventDelete = () => {
        console.log('delete ' + this.state.chosenData.id)
    };

    onAddVisit = (info) => {
        this.setState({
            newVisitModal: true,
            newVisitData: {
                ...this.state.newVisitData,
                date: info.start,
            }
        })
    };

    closeNewVisitModal = () => {
        this.setState({
            newVisitModal: false,
        })
    };

    onSaveNewVisit = (obj) => {
        console.log(obj);
        this.setState({
            newVisitModal: false,
        })
    };

    onPatientEmail = () => {
        this.setState({newMessageModal: true,})
    };

    closeNewMessage = () => {
        this.setState({newMessageModal: false,})
    };

    onSendNewMessage = (info) => {
        console.log(info);
        this.setState({newMessageModal: false,})
    };

    changeToEditorMode = (isEditorMode) => {
        this.setState({isEditorMode})
    };

    closeReceptionSchedule = () => {
        this.setState({
            receptionsScheduleModal: false,
            receptionData: {
                ...this.state.receptionData,
                dates: [],
            }
        })
    };

    onSaveReceptionSchedule = (info) => {
        console.log(info);
        this.setState({
            receptionsScheduleModal: false,
            receptionData: {
                ...this.state.receptionData,
                dates: [],
            }
        })
    };

    openReceptionSchedule = (date, schedule) => {
        console.log(date, schedule);
        if(schedule){
            this.setState({
                receptionData: {
                    ...this.state.receptionData,
                    currentSched: schedule
                }
            })
        }
        if (date.length !== 0) {
            this.setState({
                receptionsScheduleModal: true,
                receptionData: {
                    ...this.state.receptionData,
                    dates: [].concat(this.state.receptionData.dates, date)
                }
            })
        }
    };

    render() {
        const {dates, currentSched} = this.state.receptionData;
        let editorBtn, calendar, timeSetCall = [], timeSetReception = [];


        if ('time' in currentSched || 'emergencyTime' in currentSched){
            timeSetCall = currentSched.time.map(item => {
                return {
                    defaultStartValue: moment(item.start),
                    defaultEndValue: moment(item.end),
                }
            });
            timeSetReception = currentSched.emergencyTime.map(item => {
                return {
                    defaultStartValue: moment(item.start),
                    defaultEndValue: moment(item.end),
                }
            });

        }


        if (this.state.isEditorMode) {
            editorBtn = (<Button btnText='Вернуться к графику'
                                 onClick={() => this.changeToEditorMode(false)}
                                 type='yellow'
                                 icon='arrow2_left'/>);
            calendar = (<Calendar receptionNum={23}
                                  selectable
                                  editor
                                  onMonthSelect={(date, schedule) => this.openReceptionSchedule(date, schedule)}
                                  schedules={this.props.schedules}
                                  date={this.state.currentDate}
                                  onNavigate={this.dateChangeHandler}
            />)
        }
        else {
            editorBtn = (<Button btnText='Редактор графика'
                                 onClick={() => this.changeToEditorMode(true)}
                                 type='yellow'
                                 icon='setting_edit'/>)
            calendar = (<Calendar receptionNum={this.props.events.length}
                                  selectable
                                  onSelectEvent={this.props.onSelectEvent}
                                  onSelectSlot={(slot) => this.onAddVisit(slot)}
                                  defaultView="week"
                                  date={this.state.currentDate}
                                  onNavigate={this.dateChangeHandler}
                                  step={5}
                                  events={this.props.events}
                                  onPopoverClose={this.onEventDelete}
                                  onPopoverEmail={this.onPatientEmail}
            />)
        }

        console.log('[this.props.cancelData]', this.props.cancelData)

        return (
            <Hoc>
                <Row style={{marginBottom: 25,}}>
                    <Col span={19} className='schedule-title'>
                        График работы
                    </Col>
                    <Col span={5}
                         className='schedule-editBtn'>
                        {editorBtn}
                    </Col>
                </Row>
                <Row >
                    <Col span={19}>
                        {calendar}
                    </Col>
                    <Col span={5} style={{textAlign: 'center'}}>
                        <Button
                            btnText='Отменить приемы'
                            onClick={this.props.onOpenCancelModal}
                            size='link'
                            type='link'
                            icon='circle_close'
                            svg
                        />
                        <SmallCalendar date={this.state.currentDate}
                                       onChange={this.dateChangeHandler}/>
                    </Col>
                </Row>
                <CancelVisitModal visible={this.props.cancelModal}
                                  {...this.props.cancelData}
                                  onSave={(obj) => this.props.onCloseCancelModal(true, obj)}
                                  onCancel={() => this.props.onCloseCancelModal()}
                />
                <NewVisitModal visible={this.state.newVisitModal}
                               {...this.state.newVisitData}
                               onCancel={this.closeNewVisitModal}
                               onSave={(info) => this.onSaveNewVisit(info)}
                />
                <NewMessageModal visible={this.state.newMessageModal}
                                 {...this.props.chosenData}
                                 onCancel={this.closeNewMessage}
                                 onSend={info => this.onSendNewMessage(info)}
                />
                <ReceptionsScheduleModal visible={this.state.receptionsScheduleModal}
                                         dateSet={{
                                             defaultStartValue: moment(dates[0]),
                                             defaultEndValue: moment(dates[dates.length - 1]),
                                         }}
                                         timeSetCall={timeSetCall}
                                         timeSetReception={timeSetReception}
                                         onCancel={this.closeReceptionSchedule}
                                         onSave={(info) => this.onSaveReceptionSchedule(info)}
                />
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.schedules.events,
        schedules: state.schedules.schedules,
        chosenData: state.schedules.chosenData,
        cancelModal: state.schedules.cancelModal,
        cancelData: state.schedules.cancelData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectEvent: (event) => dispatch(actions.selectEvent(event)),
        onOpenCancelModal: () => dispatch(actions.openCancelModal()),
        onCloseCancelModal: (toSave, obj) => dispatch(actions.closeCancelModal(toSave,obj))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);