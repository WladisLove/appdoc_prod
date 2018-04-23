function startRecording() {
    console.log("onClick");
  
    var videoInput = document.getElementById("videoInput");
    var videoOutput = document.getElementById("videoOutput");
  
    showSpinner(videoInput, videoOutput);
  
    var stopRecordButton = document.getElementById("stop")
  
    var options = {
      localVideo: videoInput,
      remoteVideo: videoOutput
    };
  
    // =============================================

    if (args.ice_servers) {
      console.log("Use ICE servers: " + args.ice_servers);
      options.configuration = {
        iceServers : JSON.parse(args.ice_servers)
      };
    } else {
      console.log("Use freeice")
    }
  
    // =============================================
    
    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function(error)
    {
      if(error) return onError(error)
  
      this.generateOffer(onOffer)
    });
  
    function onOffer(error, offer) {
      if (error) return onError(error);
  
      console.log("Offer...");
  
      kurentoClient(args.ws_uri, function(error, client) {
        if (error) return console.log(error);
  
        client.create('MediaPipeline', function(error, pipeline) {
          if (error) return onError(error);
  
          console.log("Got MediaPipeline");
  
          var elements =
          [
            {type: 'RecorderEndpoint', params: {uri : args.file_uri}},
            {type: 'WebRtcEndpoint', params: {}}
          ]
  
          pipeline.create(elements, function(error, elements){
            if (error) return onError(error);
  
            var recorder = elements[0]
            var webRtc   = elements[1]
  
            setIceCandidateCallbacks(webRtcPeer, webRtc, onError)
  
            webRtc.processOffer(offer, function(error, answer) {
              if (error) return onError(error);
  
              console.log("offer");
  
              webRtc.gatherCandidates(onError);
              webRtcPeer.processAnswer(answer);
            });
  
            client.connect(webRtc, webRtc, recorder, function(error) {
              if (error) return onError(error);
  
              console.log("Connected");
  
              recorder.record(function(error) {
                if (error) return onError(error);
  
                console.log("record");
  
                stopRecordButton.addEventListener("click", function(event){
                  recorder.stop();
                  pipeline.release();
                  webRtcPeer.dispose();
                  videoInput.src = "";
                  videoOutput.src = "";
  
                  hideSpinner(videoInput, videoOutput);
  
                  var playButton = document.getElementById('play');
                  playButton.addEventListener('click', startPlaying);
                })
              });
            });
          });
        });
      });
    }
  }