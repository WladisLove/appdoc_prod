import React from 'react'

import Hoc from '../../hoc'
import { Row, Col, Button, Calendar } from 'appdoc-component'

import  {events } from './mock-data'
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
                        <Calendar receptionNum={events.length}
                                  selectable
                                  onSelectEvent={(obj) => console.log('Receive', obj)}
                                  onSelectSlot={(slot) => console.log('Slot info', slot)}
                                  defaultView="week"
                                  step = {5}
                                  events={events}
                        />
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

export default Schedule;