import React from 'react';
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from '../Button'
import Radio from '../Radio'
import ChatFiles from '../ChatFiles'
import ChatSend from '../ChatSend'
import ChatMessage from '../ChatMessage'
import ChatVideoPanel from '../ChatVideoPanel'

import './style.css'
import '../../icon/style.css'

const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;



//var ws = new WebSocket('wss://' + 'localhost:8443' + '/one2one');

/*
var registerName = null;
const NOT_REGISTERED = 0;
const REGISTERING = 1;
const REGISTERED = 2;
var registerState = null

function setRegisterState(nextState) {
	switch (nextState) {
	case REGISTERED:
		setCallState(NO_CALL);
		break;

	default:
		return;
	}
	registerState = nextState;
}
*/

/*
window.onbeforeunload = function() {
	ws.close();
}
*/
/*ws.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'registerResponse':
		resgisterResponse(parsedMessage);
		break;
	case 'callResponse':
		callResponse(parsedMessage);
		break;
	case 'incomingCall':
		incomingCall(parsedMessage);
		break;
	case 'startCommunication':
		startCommunication(parsedMessage);
		break;
	case 'stopCommunication':
		console.info("Communication ended by remote peer");
		stop(true);
		break;
	case 'iceCandidate':
		webRtcPeer.addIceCandidate(parsedMessage.candidate)
		break;
	default:
		console.error('Unrecognized message', parsedMessage);
	}
}*/
/*
function resgisterResponse(message) {
	if (message.response == 'accepted') {
		setRegisterState(REGISTERED);
	} else {
		setRegisterState(NOT_REGISTERED);
		var errorMessage = message.message ? message.message
				: 'Unknown reason for register rejection.';
		console.log(errorMessage);
		alert('Error registering user. See console for further information.');
	}
}

function register() {
	var name = document.getElementById('name').value;
	console.log(document.getElementById('name'))
	if (name == '') {
		window.alert("You must insert your user name");
		return;
	}

	setRegisterState(REGISTERING);

	var message = {
		id : 'register',
		name : name
	};
	sendMessage(message);
	document.getElementById('peer').focus();
}
*/

 


class ChatVideoContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            callState: 0,
            from: this.props.from,
            to: this.props.to,
        }
        this.videoOutput = null;
        this.videoInput = null;
        this.ws = this.props.ws;
        this.webRtcPeer = null;
        this.kurentoUtils = this.props.kurentoUtils;

        this.ws.onmessage = function(message) {
            var parsedMessage = JSON.parse(message.data);
            console.info('Received message: ' + message.data);
        
            switch (parsedMessage.id) {
            /*case 'registerResponse':
                resgisterResponse(parsedMessage);
                break;*/
            case 'callResponse':
                this.callResponse(parsedMessage);
                break;
            case 'incomingCall':
                this.incomingCall(parsedMessage);
                break;
            case 'startCommunication':
                this.startCommunication(parsedMessage);
                break;
            case 'stopCommunication':
                console.info("Communication ended by remote peer");
                this.stop(true);
                break;
            case 'iceCandidate':
                this.webRtcPeer.addIceCandidate(parsedMessage.candidate)
                break;
            default:
                console.error('Unrecognized message', parsedMessage);
            }
        }
    }

    register = () => {
        const name = window.prompt('enter your id');
        this.setState({from: name});
        this.sendMessage(message = {
            id : 'register',
            name,
        });
    }

    callResponse = (message) => {
        if (message.response != 'accepted') {
            const errorMessage = message.message ? message.message
                    : 'Unknown reason for call rejection.';
            console.log(errorMessage);
            this.stop(true);
        } else {
            this.setState({callState: IN_CALL});
            this.webRtcPeer.processAnswer(message.sdpAnswer);
        }
    }

    startCommunication = (message) => {
        this.setState({callState: IN_CALL});
        this.webRtcPeer.processAnswer(message.sdpAnswer);
    }

    incomingCall = (message) => {
        // If bussy just reject without disturbing user
        if (this.state.callState != NO_CALL) {
            return this.sendMessage(response = {
                id : 'incomingCallResponse',
                from : message.from,
                callResponse : 'reject',
                message : 'bussy'
            });
        }
    
        this.setState({callState: PROCESSING_CALL});
        //TODO: normal confirm
        if (window.confirm('User ' + message.from
        + ' is calling you. Do you accept the call?')) {
    
            const options = {
                localVideo : this.videoInput,
                remoteVideo : this.videoOutput,
                onicecandidate : this.onIceCandidate
            }
    
            this.webRtcPeer = this.kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
                    (error) => {
                        if (error) {
                            this.setState({callState: NO_CALL});
                        }
    
                        console.log(this);
                        this.generateOffer((error, offerSdp) => {
                            if (error) {
                                this.setState({callState: NO_CALL});
                            }
                            sendMessage({
                                id : 'incomingCallResponse',
                                from : message.from,
                                callResponse : 'accept',
                                sdpOffer : offerSdp
                            });
                        });
                    });
    
        } else {
            sendMessage({
                id : 'incomingCallResponse',
                from : message.from,
                callResponse : 'reject',
                message : 'user declined'
            });
            stop(true);
        }
    }

    call = () => {
        // TODO: check for person online
        if (false) {
            window.alert("You must specify the peer name");
            return;
        }
        this.setState({callState:NO_CALL});
    
        const options = {
            localVideo : this.videoInput,
            remoteVideo : this.videoOutput,
            onicecandidate : this.onIceCandidate,
        }
    
        this.webRtcPeer = this.kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, (error) => {
            if (error) {
                this.setState({callState:NO_CALL});
            }
    
            this.generateOffer((error, offerSdp) => {
                if (error) {
                    this.setState({callState:NO_CALL});
                }
                // TODO: from and to values
                const {from} = this.state;
                const to = window.prompt('Enter id to call');
                this.sendMessage({
                    id : 'call',
                    from,
                    to,
                    sdpOffer : offerSdp
                });
            });
        });
    
    }

    stop = (message) => {
        this.setState({callState:NO_CALL});
        if (this.webRtcPeer) {
            this.webRtcPeer.dispose();
            this.webRtcPeer = null;
    
            if (!message) {
                this.sendMessage({id : 'stop'});
            }
        }
    }

    sendMessage = (message) => {
        this.ws.send(JSON.stringify(message));
    }

    onIceCandidate = (candidate) => {
        this.sendMessage({
            id : 'onIceCandidate',
            candidate : candidate
        });
    }

    
    render() {
        const {isActive, videoCalling, onVideoCallBegin, onVideoCallStop} = this.props;
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': isActive});

        const content = videoCalling
            ?   <div className='chat-card-message__area'>
                    <video className='chat-card-video__box' 
                            autoPlay
                            ref={video => {this.videoOutput = video;}}
                            poster="https://i.ytimg.com/vi/gLa1sVtgGyI/maxresdefault.jpg"></video>
                    <video className='chat-card-video__mini' 
                            autoPlay
                            ref={video => {this.videoInput = video;}}
                            poster="https://i.ytimg.com/vi/gLa1sVtgGyI/maxresdefault.jpg"></video>
                    <div className='chat-card-video__panel'>
                        <ChatVideoPanel  duration='00:00:34' onStop={this.stop}/>
                    </div>
                </div>
            : <Button btnText='Call'
                    onClick={this.call}
            />

        return (

            <div className={dialogsClass}>
                {content}
            </div>

        )
    }
}

ChatVideoContent.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,

    videoCalling: PropTypes.bool,
    onVideoCallBegin: PropTypes.func,
    onVideoCallStop: PropTypes.func,
};

ChatVideoContent.defaultProps = {
    videoCalling: false,
    onVideoCallBegin: () => {},
    onVideoCallStop: () => {},

    ws: null,
    kurentoUtils: null,
};

export default ChatVideoContent