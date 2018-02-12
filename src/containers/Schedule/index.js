import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux';

import Hoc from '../../hoc'
import { Row, Col, Button,
    Calendar, SmallCalendar,
    CancelVisitModal, NewVisitModal } from 'appdoc-component'

import './styles.css'

class Schedule extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            currentDate: new Date(2018,1,1),
            cancelModal: false,
            cancelData: {
                id: null,
                rangeSet: [],
            },
            newVisitModal: false,
        }
    };

    selectEventHandler = (event) => {
        console.log(event)
        this.setState({
            cancelData:{
                id: event.id,
                rangeSet:[{
                    defaultStartValue: moment(event.start),
                    defaultEndValue: moment(event.end),
                }]
            }
        });
    };

    openCancelModal = () => {
        this.setState({
            cancelModal: true,
        })
    };

    onSaveEventHandler = (obj) => {
        console.log(obj);
        this.setState({
            cancelModal: false,
            cancelData: {
                rangeSet: [],
            },
        });
    };

    closeCancelModal = () => {
        console.log(this.state);
        this.setState({
            cancelModal: false,
            cancelData: {
                rangeSet: [],
            }
        });
    };

    dateChangeHandler = (date) => {
        this.setState({
            currentDate: date,
        })
    };

    onEventDelete = () => {
        console.log('delete '+ this.state.cancelData.id)
    };

    onAddVisit = (info) => {
        console.log(info);
        this.setState({newVisitModal: true})
    };

    closeNewVisitModal = () => {
        console.log(1);
        this.setState({newVisitModal: false})
    };

    render(){
        return (
            <Hoc>
                <Row style={{marginBottom: 25,}}>
                    <Col span={19} className='schedule-title'>
                        График работы
                    </Col>
                    <Col span={5}
                         className='schedule-editBtn'>
                        <Button btnText='Редактор графика'
                                type='yellow'
                                icon='setting_edit'
                        />
                    </Col>
                </Row>
                <Row >
                    <Col span={19}>
                        <Calendar receptionNum={this.props.events.length}
                                  selectable
                                  onSelectEvent={this.selectEventHandler}
                                  onSelectSlot={(slot) => this.onAddVisit(slot)}
                                  defaultView="week"
                                  date={this.state.currentDate}
                                  onNavigate={this.dateChangeHandler}
                                  step = {5}
                                  events={this.props.events}
                                  onPopoverClose = {this.onEventDelete}
                        />
                    </Col>
                    <Col span={5} style={{textAlign: 'center'}}>
                        <Button
                            btnText='Отменить приемы'
                            onClick={this.openCancelModal}
                            size='link'
                            type='link'
                            icon='circle_close'
                            svg
                        />
                        <SmallCalendar date={this.state.currentDate}
                                       onChange={this.dateChangeHandler}/>
                    </Col>
                </Row>
                <CancelVisitModal visible={this.state.cancelModal}
                                  {...this.state.cancelData}
                                  onSave={this.onSaveEventHandler}
                                  onCancel = {this.closeCancelModal}
                />
                <NewVisitModal visible={this.state.newVisitModal}
                               onCancel={this.closeNewVisitModal}
                />
            </Hoc>
        )
    }
}

const mapStateToProps = state => {
    return {
        events: state.schedules.events,
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Schedule);