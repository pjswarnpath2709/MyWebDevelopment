import React from "react";
import VideoItem from "./VideoItem";

class VideoList extends React.Component {
  _getRenderList = () => {
    const videos = this.props.videos;
    const onVideoSelect = this.props.onVideoSelect;
    const renderedList = videos.map((video) => {
      return (
        <VideoItem
          key={video.id.videoId}
          onVideoSelect={onVideoSelect}
          video={video}
        />
      );
    });
    return renderedList;
  };
  render() {
    return (
      <div className="ui relaxed divided list">{this._getRenderList()}</div>
    );
  }
}

export default VideoList;
