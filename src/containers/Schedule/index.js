import React from 'react'
import { connect } from 'react-redux';

import Hoc from '../../hoc'
import { Row, Col, Button, Calendar } from 'appdoc-component'

import './styles.css'

class Schedule extends React.Component{

    render(){

        return (

            <Hoc>
                <Row style={{marginBottom: 25,}}>
                    <Col span={19} className='schedule-title'>
                        График работы
                    </Col>
                    <Col span={5} className='schedule-editBtn'>
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
                                  onSelectEvent={(obj) => console.log('Receive', obj)}
                                  onSelectSlot={(slot) => console.log('Slot info', slot)}
                                  defaultView="week"
                                  step = {5}
                                  events={this.props.events}
                        />
                    </Col>
                </Row>
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