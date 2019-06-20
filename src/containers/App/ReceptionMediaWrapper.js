import React from 'react';
import Hoc from '../../hoc'
import Adapter from 'webrtc-adapter'
import { connect } from 'react-redux';
import { setVideoIn, setVideoOut } from './chatWs'
import { Translate } from 'react-localize-redux'

import './styles.css';
import '../../styles/fonts.css';
import { detect } from 'detect-browser';
const browser = detect();


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.isSafari = browser ? browser.name == 'safari' : true;
    }

    setVideoOutRef = (video) => {
        this.isSafari && (this.videoOut = video);
        setVideoOut(video);
    }
    setVideoInRef = (video) => {
        this.isSafari && (
            this.videoIn = video,
            video && video.play()
        );
        setVideoIn(video);
    }

    renderVideos = () => (
        <Hoc>
            <video className='chat-card-video__box'
                poster={this.props.avatar}
                autoPlay
                ref={this.setVideoOutRef}
            ></video>
            <video className='chat-card-video__mini'
                autoPlay
                ref={this.setVideoInRef}
                id='setVideoInRef'
            ></video>
        </Hoc>
    )
    renderSafariVideos = () => (
        <Hoc>
            <video className='chat-card-video__box'
                poster={this.props.avatar}
                playsInline
                ref={this.setVideoOutRef}
            ></video>
            <video className='chat-card-video__mini'
                playsInline
                ref={this.setVideoInRef}
                id='setVideoInRef'
            ></video>
        </Hoc>
    );

    onClickHandler = () => {
        const { history, isChatRoute } = this.props;
        !isChatRoute && history.push('/app/chat');

    }

    render() {
        const { isChatArea, isFilesArea, isChatRoute = false, isCalling } = this.props;
        const className = !isChatRoute
            ? 'reception-mini-video-wrapper'
            : (isChatArea && isFilesArea)
                ? 'reception-video-wrapper reception-video-wrapper_2additionalAreas'
                : (isChatArea || isFilesArea)
                    ? 'reception-video-wrapper reception-video-wrapper_1additionalArea'
                    : 'reception-video-wrapper';

        return (
            <div className={className} style={{ display: isChatRoute ? 'block' : isCalling ? 'block' : 'none' }} onClick={this.onClickHandler}>
                {this.isSafari ? this.renderSafariVideos() : this.renderVideos()}

                {!isChatRoute && (
                    <Translate>
                        {({ translate }) =>
                            (<div className='reception-mini-back-btn'>{translate('button.title.backToReception')}</div>)
                        }
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
    const avatar = mode === 'doc' ? visitInfo.avatar : visitInfo.avatar_doc;
    return { isChatArea, isFilesArea, isCalling, avatar }
}

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
