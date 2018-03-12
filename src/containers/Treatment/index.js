import React from 'react'
import kurentoUtils from 'kurento-utils'
import { Icon, Row, Col, HistoryReceptions } from 'appdoc-component'
import Hoc from '../../hoc'

import {historyArr} from './mock-data'
import './styles.css'


var ws = new WebSocket('wss://' + 'localhost:8443' + '/one2one');
var videoInput;
var videoOutput;
var webRtcPeer;

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

const NO_CALL = 0;
const PROCESSING_CALL = 1;
const IN_CALL = 2;
var callState = null

function setCallState(nextState) {
	switch (nextState) {
	case NO_CALL:
	case PROCESSING_CALL:
	case IN_CALL:
		break;
	default:
		return;
	}
	callState = nextState;
}

window.ws = ws;

window.onload = function() {
	setRegisterState(NOT_REGISTERED);
	ws.onload = () => console.log('load')
	
}

window.onbeforeunload = function() {
	ws.close();
}

ws.onmessage = function(message) {
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
}

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

function callResponse(message) {
	if (message.response != 'accepted') {
		console.info('Call not accepted by peer. Closing call');
		var errorMessage = message.message ? message.message
				: 'Unknown reason for call rejection.';
		console.log(errorMessage);
		stop(true);
	} else {
		setCallState(IN_CALL);
		webRtcPeer.processAnswer(message.sdpAnswer);
	}
}

function startCommunication(message) {
	setCallState(IN_CALL);
	webRtcPeer.processAnswer(message.sdpAnswer);
}

function incomingCall(message) {
	// If bussy just reject without disturbing user
	if (callState != NO_CALL) {
		var response = {
			id : 'incomingCallResponse',
			from : message.from,
			callResponse : 'reject',
			message : 'bussy'

		};
		return sendMessage(response);
	}

	setCallState(PROCESSING_CALL);
	if (window.confirm('User ' + message.from
	+ ' is calling you. Do you accept the call?')) {

		var options = {
			localVideo : videoInput,
			remoteVideo : videoOutput,
			onicecandidate : onIceCandidate
		}
		

		webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options,
				function(error) {
					if (error) {
						console.error(error);
						setCallState(NO_CALL);
					}

					this.generateOffer(function(error, offerSdp) {
						if (error) {
							console.error(error);
							setCallState(NO_CALL);
						}
						var response = {
							id : 'incomingCallResponse',
							from : message.from,
							callResponse : 'accept',
							sdpOffer : offerSdp
						};
						console.log('[ATTENTION]');
						sendMessage(response);
					});
				});

	} else {
		var response = {
			id : 'incomingCallResponse',
			from : message.from,
			callResponse : 'reject',
			message : 'user declined'
		};
		sendMessage(response);
		stop(true);
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

function call() {
	if (document.getElementById('peer').value == '') {
		window.alert("You must specify the peer name");
		return;
	}

	setCallState(PROCESSING_CALL);


	var options = {
		localVideo : videoInput,
		remoteVideo : videoOutput,
		onicecandidate : onIceCandidate
	}

	webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(
			error) {
		if (error) {
			console.error(error);
			setCallState(NO_CALL);
		}

		this.generateOffer(function(error, offerSdp) {
			if (error) {
				console.error(error);
				setCallState(NO_CALL);
			}
			var message = {
				id : 'call',
				from : document.getElementById('name').value,
				to : document.getElementById('peer').value,
				sdpOffer : offerSdp
			};
			sendMessage(message);
		});
	});

}

function stop(message) {
	setCallState(NO_CALL);
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer = null;

		if (!message) {
			var message = {
				id : 'stop'
			}
			sendMessage(message);
		}
	}
}

function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Senging message: ' + jsonMessage);
	ws.send(jsonMessage);
}

function onIceCandidate(candidate) {
	console.log('Local candidate' + JSON.stringify(candidate));

	var message = {
		id : 'onIceCandidate',
		candidate : candidate
	}
	sendMessage(message);
}



class Treatment extends React.Component{

    render(){


        return (
            <Hoc>
                <div className="col-md-5">
                    <label className="control-label">Name</label>
                    <div className="row">
                        <div className="col-md-6">
                        <input id="name" name="name" className="form-control" type="text"/>
                        </div>
                        <div className="col-md-6 text-right">
                        <a id="register" href="#" className="btn btn-primary" onClick={register}>
                            <span className="glyphicon glyphicon-plus"></span> Register</a>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <label className="control-label">Peer</label>
                    <div className="row">
                        <div className="col-md-6">
                        <input id="peer" name="peer" className="form-control" type="text"/>
                        </div>
                        <div className="col-md-6 text-right">
                        <a id="call" href="#" className="btn btn-success" onClick={call}>
                            <span className="glyphicon glyphicon-play"></span> Call</a>
                        <a id="terminate" href="#" className="btn btn-danger" onClick = {stop}>
                            <span className="glyphicon glyphicon-stop"></span> Stop</a>
                        </div>
                    </div>
                    <br/>
                    </div>
                    <div className="col-md-7">
                    <div id="videoBig">
                        <video id="videoOutput" autoPlay width="640px" 
                        height="480px" poster="img/webrtc.png" 
                        ref={video => {videoOutput = video}}></video>
                    </div>
                    <div id="videoSmall">
                        <video id="videoInput" autoPlay width="240px" 
                        height="180px" poster="img/webrtc.png"
                        ref={video => {videoInput = video}}></video>
                    </div>
                    </div>
            	<Row>
            		<Col span={24} className='section'>
            			<HistoryReceptions data={historyArr}/>
            		</Col>
            	</Row>
            </Hoc>
        )
    }
}

export default Treatment;