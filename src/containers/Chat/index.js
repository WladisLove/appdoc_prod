import React from 'react'
import { Icon, Row, Col } from 'appdoc-component'
import kurentoUtils from 'kurento-utils'
import Hoc from '../../hoc'

import ChatCard from './ChatCard'

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            videoCalling: true,
            from: 0,
        }
    }

    render(){


        return (
            <Hoc>
                <Row>
                    <Col span={24} className='section'>
                    lol
                        <ChatCard videoCalling={this.state.videoCalling}
                                    ws={new WebSocket('wss://' + 'localhost:8443' + '/one2one')}
                                    kurentoUtils={kurentoUtils}

                                    from={this.state.from}
                                    onRegister = {(from) => this.setState({from})}


                                    onVideoCallBegin={()=> {this.setState({videoCalling: true});console.log('Begin video calling')}}
                                    onVideoCallStop={console.log('Close video calling')}/>
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

export default Chat;