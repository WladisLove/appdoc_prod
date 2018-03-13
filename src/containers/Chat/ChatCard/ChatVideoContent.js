import React from 'react';
import kurentoUtils from 'kurento-utils'

import PropTypes from 'prop-types'
import cn from 'classnames'

import { Button, Radio, ChatFiles, ChatSend, ChatMessage, ChatVideoPanel } from 'appdoc-component'


import './style.css'


/*var ws = new WebSocket('wss://' + 'localhost:8443' + '/one2one');
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
	callState = nextState;
}

window.ws = ws;

window.onload = function() {
	setRegisterState(NOT_REGISTERED);	
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
	ws.send(JSON.stringify(message));
}

function onIceCandidate(candidate) {
	var message = {
		id : 'onIceCandidate',
		candidate : candidate
	}
	sendMessage(message);
}*/

 


class ChatVideoContent extends React.Component {
    

    /*call = () => {
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
            console.log('------------------------------')
            console.log(this)
            console.log('------------------------------')
    
    
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
    
    }*/
    
    render() {
        const {isActive, videoCalling, onVideoCallBegin, onVideoCallStop} = this.props;
        const dialogsClass = cn('chat-card-dialogs', {'chat-card-dialogs-active': isActive});

       /* const content = videoCalling
            ?<div>   
                <div>
                        <input id="name" name="name" className="form-control" type="text"/>
                        
                        <a id="register" href="#" className="btn btn-primary" onClick={register}>
                            <span className="glyphicon glyphicon-plus"></span> Register</a>
                    <br/>
                    <br/>
                    <label className="control-label">Peer</label>
                    
                        <input id="peer" name="peer" className="form-control" type="text"/>
                        
                        <a id="call" href="#" className="btn btn-success" onClick={this.call}>
                            <span className="glyphicon glyphicon-play"></span> Call</a>
                        <a id="terminate" href="#" className="btn btn-danger" onClick = {stop}>
                            <span className="glyphicon glyphicon-stop"></span> Stop</a>
                        
                    </div>
            <div className='chat-card-message__area'>
                    
                    <video className='chat-card-video__box' 
                            autoPlay
                            ref={video => {videoOutput = video;}}
                            poster="https://i.ytimg.com/vi/gLa1sVtgGyI/maxresdefault.jpg"></video>
                    <video className='chat-card-video__mini' 
                            autoPlay
                            ref={video => {videoInput = video;}}
                            poster="https://i.ytimg.com/vi/gLa1sVtgGyI/maxresdefault.jpg"></video>
                    <div className='chat-card-video__panel'>
                        <ChatVideoPanel  duration='00:00:34' onStop={stop}/>
                    </div>
                </div>
                </div>
            : <Button btnText='Call'
                    onClick={this.call}
            />*/

        return (

            <div className={dialogsClass}>
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

    kurentoUtils: null,
};

export default ChatVideoContent