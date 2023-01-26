import React, { useEffect } from "react";
import { fetchStreams } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { STREAM_CREATE, STREAM_EDIT } from "../../routerPaths";

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
  useEffect(() => {
    fetchStreams();
  }, []);

  const renderAdmin = (stream) => {
    if (stream.userID === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  };
  const renderList = () => {
    return streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreateButton = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link className="ui button green" to={STREAM_CREATE}>
            CREATE STREAM
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      <div>Streams</div>
      <div className="ui celled list">{renderList()}</div>
      {renderCreateButton()}
    </div>
  );
};

const mapStateToProps = (stateInReduxStore) => {
  return {
    streams: Object.values(stateInReduxStore.streams),
    currentUserId: stateInReduxStore.auth.userID,
    isSignedIn: stateInReduxStore.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchStreams,
})(StreamList);
