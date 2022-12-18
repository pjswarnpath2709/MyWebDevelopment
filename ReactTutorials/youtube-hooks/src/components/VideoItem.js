import React from "react";
import "./VideoItem.css";

class VideoItem extends React.Component {
  render() {
    const video = this.props.video;
    const onVideoSelect = this.props.onVideoSelect;
    return (
      <div
        className="video-item item"
        onClick={() => {
          onVideoSelect(video);
        }}
      >
        <img
          alt={video.snippet.title}
          src={video.snippet.thumbnails.medium.url}
          className="ui image"
        />
        <div className="content">
          <div className="header">{video.snippet.title}</div>
        </div>
      </div>
    );
  }
}

export default VideoItem;
