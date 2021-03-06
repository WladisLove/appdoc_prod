import React from "react";
import Hoc from "../../hoc";
import Adapter from "webrtc-adapter";
import { connect } from "react-redux";
import { setVideoIn, setVideoOut } from "./chatWs";
import { Translate } from "react-localize-redux";
import { Icon } from "antd";

import * as actions from "../../store/actions";

import "./styles.css";
import "../../styles/fonts.css";
import { detect } from "detect-browser";
const browser = detect();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.isSafari = browser ? browser.name == "safari" : true;
  }

  setVideoOutRef = video => {
    console.log("VIDEOGO");
    console.log(video);
    this.isSafari && (this.videoOut = video);
    setVideoOut(video);
  };
  setVideoInRef = video => {
    this.isSafari && ((this.videoIn = video), video && video.play());
    setVideoIn(video);
  };

  renderVideos = () => (
    <Hoc>
      <video
        className="chat-card-video__box"
        autoPlay
        ref={this.setVideoOutRef}
      />
      <video
        className="chat-card-video__mini"
        autoPlay
        ref={this.setVideoInRef}
        id="setVideoInRef"
      />
    </Hoc>
  );
  renderSafariVideos = () => (
    <Hoc>
      <video
        className="chat-card-video__box"
        playsInline
        autoPlay
        ref={this.setVideoOutRef}
      />
      <video
        className="chat-card-video__mini"
        playsInline
        autoPlay
        ref={this.setVideoInRef}
        id="setVideoInRef"
      />
    </Hoc>
  );

  onClickHandler = () => {
    const { history, isChatRoute } = this.props;
    !isChatRoute && history.push("/app/chat");
  };

  render() {
    const {
      isChatArea,
      isFilesArea,
      isChatRoute = false,
      isCalling,
      fullscreenMode,
      exitFullscreenMode
    } = this.props;
    const className = !isChatRoute
      ? "reception-mini-video-wrapper"
      : isChatArea && isFilesArea
      ? "reception-video-wrapper reception-video-wrapper_2additionalAreas"
      : isChatArea || isFilesArea
      ? "reception-video-wrapper reception-video-wrapper_1additionalArea"
      : "reception-video-wrapper";

    const background = 'url(' + this.props.avatar + ')';

    return (
      <div
        className={`${className} ${fullscreenMode ? "fullscreen-mode" : null}`}
        style={{
          display: isChatRoute ? "block" : isCalling ? "block" : "none"
        }}
        onClick={this.onClickHandler}
      >
        {this.isSafari ? this.renderSafariVideos() : this.renderVideos() }
        {fullscreenMode && (
          <div
            className="fullcreen-exit-icon"
            onClick={() => exitFullscreenMode()}
          >
            <Icon type="fullscreen-exit" />
          </div>
        )}
        {!isChatRoute && (
          <Translate>
            {({ translate }) => (
              <div className="reception-mini-back-btn">
                {translate("button.title.backToReception")}
              </div>
            )}
          </Translate>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  auth: { mode },
  chatState: { isChatArea, isFilesArea, fullscreenMode },
  chatWS: { isCalling },
  treatments: { visitInfo }
}) => {
  const avatar = mode === "doc" ? visitInfo.avatar : visitInfo.avatar_doc;
  return { isChatArea, isFilesArea, isCalling, avatar, fullscreenMode };
};

const mapDispatchToProps = dispatch => {
  return {
    exitFullscreenMode: () => dispatch(actions.exitFullscreenMode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
