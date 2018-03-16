import React from 'react'
import { Icon, Row, Col } from 'appdoc-component'
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
                        <ChatCard videoCalling={this.state.videoCalling}
                                    wsURL={'wss://178.172.235.105:8443/one2one'}

                                    from={this.state.from}
                                    onRegister = {(from) => this.setState({from})}


                                    onVideoCallBegin={()=> {this.setState({videoCalling: true});console.log('Begin video calling')}}
                                    onVideoCallStop={console.log('Close video calling')}/>
                    </Col>
                </Row>
            </Hoc>
        )
    }z
}

export default Chat;