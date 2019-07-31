import React from "react";
import Hoc from "../../hoc";
import Adapter from "webrtc-adapter";
import { connect } from "react-redux";
import { setVideoIn, setVideoOut } from "./chatWs";
import { Translate } from "react-localize-redux";
import { Icon } from "antd";

import "./styles.css";
import "../../styles/fonts.css";
import { detect } from "detect-browser";
const browser = detect();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreenMode: false
    };
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
        poster={this.props.avatar}
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
        poster={this.props.avatar}
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

  toggleFullscreenMode = () => {
    const { fullscreenMode } = this.state;

    this.setState({ fullscreenMode: !fullscreenMode });
  };

  render() {
    const {
      isChatArea,
      isFilesArea,
      isChatRoute = false,
      isCalling
    } = this.props;
    const { fullscreenMode } = this.state;
    const className = !isChatRoute
      ? "reception-mini-video-wrapper"
      : isChatArea && isFilesArea
      ? "reception-video-wrapper reception-video-wrapper_2additionalAreas"
      : isChatArea || isFilesArea
      ? "reception-video-wrapper reception-video-wrapper_1additionalArea"
      : "reception-video-wrapper";

    return (
      <div
        className={`${className} ${
          this.state.fullscreenMode ? "fullscreen-mode" : null
        }`}
        style={{
          display: isChatRoute ? "block" : isCalling ? "block" : "none"
        }}
        onClick={this.onClickHandler}
      >
        {this.isSafari ? this.renderSafariVideos() : this.renderVideos()}
        {isCalling && (
          <div className="expand-icon" onClick={this.toggleFullscreenMode}>
            <Icon type={fullscreenMode ? "fullscreen-exit" : "fullscreen"} />
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
  chatState: { isChatArea, isFilesArea },
  chatWS: { isCalling },
  treatments: { visitInfo }
}) => {
  const avatar = mode === "doc" ? visitInfo.avatar : visitInfo.avatar_doc;
  return { isChatArea, isFilesArea, isCalling, avatar };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
