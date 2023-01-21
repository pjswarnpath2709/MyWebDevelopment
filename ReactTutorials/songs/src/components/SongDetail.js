import React from "react";
import { connect } from "react-redux";

const SongDetail = (props) => {
  const renderSongDetail = () => {
    return (
      <div
        className="song-detail"
        style={{
          background: "transparent",
          minHeight: "240px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="song-title"
          style={{
            fontSize: "1.875rem",
            color: "red",
          }}
        >
          <p>Title : {props.currentSong.title}</p>
        </div>
        <div
          className="song-duration"
          style={{
            fontSize: "1.5rem",
            color: "blue",
          }}
        >
          <p>Duration : {props.currentSong.duration}</p>
        </div>
      </div>
    );
  };
  return props.currentSong ? renderSongDetail() : <div>Select a song</div>;
};

const mapStateToProps = (stateInsideReduxStore) => {
  return {
    currentSong: stateInsideReduxStore.selectedSong,
  };
};
export default connect(mapStateToProps)(SongDetail);
