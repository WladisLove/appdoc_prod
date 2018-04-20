import React from 'react';
import kurentoUtils from 'kurento-utils'

import PropTypes from 'prop-types'
import cn from 'classnames'

import { Button, Radio, ChatFiles, ChatSend, ChatMessage, ChatVideoPanel } from 'appdoc-component'
import ChatContent from './ChatContent'

import './style.css'


//import { Icon, Row, Col, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../../hoc'




var videoInput;
var videoOutput;
var webRtcPeer;

var registerName = null;
const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;
var registerState = null



const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;
var callState = null



class ChatTextContent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			from: 0,
			to: 0,
			isCalling: false,
			isActive: this.props.isActive,
			duration: 0,
			timer: {
				s: 0,
				m: 0,
				h: 0,
			},
			chatStory: [],
		}

		this.timerInterval;

		this.ws = new WebSocket(props.wsURL);
		this.ws.onmessage = (message) => {
			var parsedMessage = JSON.parse(message.data);
			console.info('Received message: ' + message.data);
		
			switch (parsedMessage.id) {
			case 'registerResponse':
				this.resgisterResponse(parsedMessage);
				break;
			case 'startCommunication':
				this.startCommunication(parsedMessage);
				break;
			case 'stopCommunication':
				console.info("Communication ended by remote peer");
				this.stop(true);
				break;
			case 'chat':
				console.log("=== [ CHAT ] ===");
				this.setState({chatStory: [...this.state.chatStory, parsedMessage]})
				break;
			case 'iceCandidate':
				webRtcPeer.addIceCandidate(parsedMessage.candidate)
				break;
			default:
				console.error('Unrecognized message', parsedMessage);
			}
		}
	}

	timer = () => {
		this.state.timer.s >= 59 
			? (
				this.state.timer.m >= 59 
					? (
						this.setState(prev => ({timer: {
							h: prev.timer.h +1,
							s: 0,
							m: 0,
						}}))
					)
					: this.setState(prev => ({timer: {
						...prev.timer,
						m: prev.timer.m +1,
						s: 0,
					}}))
			)
			: 
			this.setState(prev => ({timer: {
				...prev.timer,
				s: prev.timer.s +1,
			}}));
	}

	componentWillMount(){
		this.register();
	}


	componentWillUnmount(){
		clearInterval(this.timerInterval);
		this.ws.close();
	}

	setRegisterState = (nextState) => {
		switch (nextState) {
		case REGISTERED:
			this.setCallState(NO_CALL);
			break;
	
		default:
			return;
		}
		registerState = nextState;
	}

	setCallState = (nextState) => {
		nextState === IN_CALL ? this.timerInterval = setInterval(this.timer, 1000) : null;
		callState = nextState;
	}

	resgisterResponse = (message) => {
		if (message.response == 'accepted') {
			this.setRegisterState(REGISTERED);
		} else {
			this.setRegisterState(NOT_REGISTERED);
			var errorMessage = message.message ? message.message
					: 'Unknown reason for register rejection.';
			console.log(errorMessage);
			window.alert('Error registering user. See console for further information.');
		}
	}

	startCommunication = (message) => {
		this.setCallState(IN_CALL);
		webRtcPeer.processAnswer(message.sdpAnswer);
	}

	register = () => {
		let a = window.prompt();
		let name = a ? a : ''+this.props.callerID;
		console.log('[my ID is]', name)
		
		this.setState({from: name});	
		this.setRegisterState(REGISTERING);
	
		this.ws.onopen = () => this.sendMessage({
			id : 'register',
			name : name
		});
	}

	stop = (message) => {
		this.setState({isCalling: false});
		clearInterval(this.timerInterval);
		this.setState({timer: {
			s: 0,
			m: 0,
			h: 0,
		}})
		this.setCallState(NO_CALL);
		if (webRtcPeer) {
			webRtcPeer.dispose();
			webRtcPeer = null;
	
			if (!message) {
				var message = {
					id : 'stop'
				}
				this.sendMessage(message);
			}
		}
	}

	sendMessage = (message) => {
		this.ws.send(JSON.stringify(message));
	}

	onIceCandidate = (candidate) => {
		var message = {
			id : 'onIceCandidate',
			candidate : candidate
		}
		this.sendMessage(message);
	}
	
	call = () => {
		this.setState({isCalling: true})
		this.setCallState(PROCESSING_CALL);
    
        let options = {
            localVideo : videoInput,
            remoteVideo : videoOutput,
            onicecandidate : this.onIceCandidate
		}
		let that = this;
    
        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(
                error) {
            if (error) {
                console.error(error);
                this.setCallState(NO_CALL);
            }

	
			const {from, to} = that.state;
    
            this.generateOffer(function(error, offerSdp) {
                if (error) {
                    console.error(error);
                    this.setCallState(NO_CALL);
                }
                var message = {
                    id : 'call',
                    from,
                    to,
                    sdpOffer : offerSdp
                };
                that.sendMessage(message);
            });
        });
    
    }

	onCall = () => {
		const answer = window.prompt('Enter ID to call');
        if (answer == '') {
            window.alert("You must specify the peer name");
            return;
		}
		this.setState({to: answer});
		
		this.call();
	}
	onStop = () => {
		this.stop();
	}
    
    
    render() {
        const {isActive} = this.props;

        return (
            <ChatContent onSend={mes => this.sendMessage({
						 id: 'chat',
						 from: this.state.from,
						 to: this.state.to,
						 ...mes,
                     })}
                     isActive = {isActive}
                     data={this.state.chatStory}
                     
		    />
        )
    }
}

ChatVideoContent.propTypes = {
	wsURL: PropTypes.string.isRequired,
};

ChatVideoContent.defaultProps = {
	wsURL: '',
};

export default ChatTextContent