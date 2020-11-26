import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import YouTube from 'react-youtube';
import getVideoId from 'get-video-id';
import classnames from 'classnames';

import './youtube-video.scss';

class YoutubeVideo extends Component {
  constructor() {
    super();

    this.state = {
      videoReady: false,
      waypoint: false,
      show: false,
    };

    this.onVideoReady = (event) => {
      this.videoPlayer = event.target;
      if (this.props.mute) { this.videoPlayer.mute(); }
      this.videoPlayer.seekTo(this.props.start);

      this.setState({ videoReady: true });

      if (this.state.waypoint) {
        this.videoPlayer.playVideo();
      }
    };

    this.onWaypointEnter = () => {
      this.setState({ waypoint: true });

      if (this.state.videoReady) {
        this.videoPlayer.playVideo();
      }
    };
    this.onWaypointLeave = () => {
      if (this.videoPlayer) {
        this.videoPlayer.pauseVideo();
      }
    };

    this.onVideoEnd = () => {
      this.videoPlayer.seekTo(this.props.start);
      this.videoPlayer.playVideo();
    };

    this.onVideoError = error => console.error('[YoutubeVideo] onVideoError', error);
  }

  render() {
    return [
      <Waypoint
        key="waypoint"
        onEnter={this.onWaypointEnter}
        onLeave={this.onWaypointLeave}
      />,
      <YouTube
        key="youtube-video"
        containerClassName="youtube-video-iframe-wrapper"
        className={classnames('youtube-video-iframe', { show: this.state.show })}
        videoId={getVideoId(this.props.url).id}
        opts={{
          playerVars: {
            controls: this.props.controls,
            showinfo: this.props.showinfo,
            rel: 0,
            start: this.props.start,
            end: this.props.end,
          },
        }}
        onPlay={() => this.setState({ show: true })}
        onEnd={this.onVideoEnd}
        onError={this.onVideoError}
        onReady={this.onVideoReady}
      />,
    ];
  }
}

YoutubeVideo.defaultProps = {
  start: 0,
  end: null,
  controls: 0,
  showinfo: 0,
  mute: true,
};

export default YoutubeVideo;
