import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flv from "flv.js";
import { history } from "../../history";

const StreamShow = ({ stream, fetchStream, streamId }) => {
  const videoRef = useRef(null);
  const videoCSSstyle = {
    width: "100%",
  };

  useEffect(() => {
    fetchStream(streamId);
  }, [fetchStream, streamId]);

  const [playerCreated, setPlayerCreated] = useState(null);

  //cleanup / destroy player when navigating away
  useEffect(() => {
    if (playerCreated) {
      return () => {
        playerCreated.destroy();
        setPlayerCreated(false);
      };
    }
  }, [playerCreated]);

  //add video
  useEffect(() => {
    if (stream && !playerCreated) {
      const player = flv.createPlayer({
        type: "flv",
        url: `http://localhost:8000/live/${streamId}.flv`,
      });

      setPlayerCreated(player);

      setTimeout(() => {
        player.attachMediaElement(videoRef.current);
        player.load();
      }, 500);
    }
  }, [streamId]);

  const Stream = () => {
    if (!stream) {
      return <div>Loading...</div>;
    }

    return (
      <div className="ui item">
        <video ref={videoRef} controls style={videoCSSstyle} />
        <h1 className="header">{stream.title}</h1>
        <p className="content">{stream.description}</p>
        <div className="footer">author: {stream.userId}</div>
      </div>
    );
  };

  return <Stream />;
};

const mapStateToProps = (state) => {
  const params = history.location.pathname.split("/").pop();
  console.log(params);
  return {
    stream: state.streams[params],
    streamId: params,
  };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
