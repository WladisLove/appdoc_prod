import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../Button";
import Hoc from "../Hoc";
import { Translate } from "react-localize-redux";
import { Icon } from "antd";

import * as actions from "../../store/actions";

import "./style.css";
import "../../icon/style.css";

class ChatVideoPanel extends React.Component {
  checkTimeFormat = number => {
    return ("" + number).length < 2 ? "0" + number : number;
  };

  render() {
    const {
      duration,
      isCalling,
      sec,
      min,
      hour,
      isUser,
      setFullscreenMode
    } = this.props;

    return (
      <div>
        <Translate>
          {({ translate }) => (
            <div className="message__panel">
              {isCalling ? (
                <Hoc>
                  <div className="message__panel-duration">
                    {this.checkTimeFormat(hour)} : {this.checkTimeFormat(min)} :{" "}
                    {this.checkTimeFormat(sec)}
                  </div>
                  <div className="message__panel-btns">
                    <Button
                      btnText=""
                      className="btn-endcall"
                      size="small"
                      type="no-brd"
                      icon="end-call-button"
                      iconSize={9}
                      title={translate("button.title.completeCall")}
                      onClick={this.props.onStop}
                    />
                  </div>
                  <div className="message__panel-full">
                    <Button
                      btnText=""
                      size="small"
                      type="no-brd"
                      icon="chat1"
                      iconSize={16}
                      onClick={this.props.onChat}
                    />
                  </div>
                  <div className="message__panel-full">
                    <div
                      className="expand-icon"
                      onClick={() => setFullscreenMode()}
                    >
                      <Icon type="fullscreen" />
                    </div>
                  </div>
                </Hoc>
              ) : (
                <Hoc>
                  {!isUser && (
                    <div className="message__panel-btns startcall">
                      <Button
                        className="btn-call"
                        btnText=""
                        size="small"
                        type="no-brd"
                        icon="phone-call-outcoming"
                        iconSize={15}
                        title={translate("button.title.startCall")}
                        onClick={this.props.onCall}
                      />
                    </div>
                  )}
                  <div className="message__panel-full">
                    <Button
                      btnText=""
                      size="small"
                      type="no-brd"
                      icon="chat1"
                      iconSize={16}
                      onClick={this.props.onChat}
                    />
                  </div>
                </Hoc>
              )}
            </div>
          )}
        </Translate>
      </div>
    );
  }
}

ChatVideoPanel.propTypes = {
  sec: PropTypes.number,
  min: PropTypes.number,
  hour: PropTypes.number,
  isCalling: PropTypes.bool,
  onStop: PropTypes.func,
  onCall: PropTypes.func,
  uploadFiles: PropTypes.func,
  onChat: PropTypes.func
};

ChatVideoPanel.defaultProps = {
  sec: 0,
  min: 0,
  hour: 0,
  isCalling: false,
  onStop: () => {},
  onCall: () => {},
  uploadFiles: () => {},
  onChat: () => {}
};

const mapStateToProps = ({}) => {};

const mapDispatchToProps = dispatch => {
  return {
    setFullscreenMode: () => dispatch(actions.setFullscreenMode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatVideoPanel);
