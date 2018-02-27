import React from 'react'
import { Icon, Row, Col, ChatCard } from 'appdoc-component'
import Hoc from '../../hoc'

class Chat extends React.Component{

    render(){


        return (
            <Hoc>
                <Row>
                    <Col span={24} className='section'>
                        <ChatCard/>
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

export default Chat;