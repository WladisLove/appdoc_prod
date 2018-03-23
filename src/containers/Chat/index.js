import React from 'react'
import {connect} from 'react-redux';

import { Icon, Row, Col, ChatDialogs } from 'appdoc-component'
import Hoc from '../../hoc'

import ChatCard from './ChatCard'

import {dialogArr} from './mock-data'

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
                    <Col xs={24} xxl={7} className='section'>
                        <ChatDialogs  data={dialogArr}/>
                    </Col>
                    <Col xs={24} xxl={17} className='section'>
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
    }
}

export default Chat;