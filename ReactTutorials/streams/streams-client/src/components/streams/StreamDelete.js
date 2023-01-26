import React, { useEffect } from "react";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { deleteStream, fetchStream } from "../../actions";
import { history } from "../../history";
import { connect } from "react-redux";
import { STREAMS_LIST } from "../../routerPaths";
const StreamDelete = ({ fetchStream, streamId, stream, deleteStream }) => {
  const actions = (
    <>
      <button
        onClick={() => deleteStream(streamId)}
        className="ui button negative"
      >
        Delete
      </button>
      <Link to={STREAMS_LIST} className="ui button ">
        Cancel
      </Link>
    </>
  );

  useEffect(() => {
    fetchStream(streamId);
  }, []);
  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this streams";
    }
    return `Are you sure you want to delete stream : "${stream.title}" ?`;
  };
  return (
    <Modal
      title={"Delete Stream"}
      content={renderContent()}
      actions={actions}
      onDismiss={() => {
        history.push("/");
      }}
    />
  );
};

const mapStateToProps = (stateInReduxStore) => {
  const params = history.location.pathname.split("/").pop();
  return {
    streamId: params,
    stream: stateInReduxStore.streams[params],
  };
};

export default connect(mapStateToProps, {
  deleteStream,
  fetchStream,
})(StreamDelete);
