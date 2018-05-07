import React from 'react'
import {connect} from 'react-redux';

import { Icon, Row, Col, ChatDialogs } from 'appdoc-component'
import Hoc from '../../hoc'

import ChatCard from './ChatCard'

import * as actions from '../../store/actions'

import {dialogArr} from './mock-data'

class Chat extends React.Component{
    render(){

        return (
            <Hoc>
                <Row>
                    <Col xs={24} xxl={7} className='section'>
                        <ChatDialogs  data={dialogArr}/>
                    </Col>
                    <Col xs={24} xxl={17} className='section'>
                        <ChatCard 
                                    wsURL={'wss://localhost:8443/one2one'}
                                    mode='video'

                                    //isEnded = {true}

                                    callerID = {this.props.id}
                                    user_mode = {this.props.user_mode}

                                    user_id = {1000}
                                    patientName = {'Иванов Иван Иванович'}

                                    completeReception = {this.props.completeReception}
                                    
                        />
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
    }
}

const mapDispatchToProps = dispatch => {
	return {
        completeReception: (obj) => dispatch(actions.completeReception(obj))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);