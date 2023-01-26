import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import { history } from "../../history";
import StreamForm from "./StreamForm";

const StreamEdit = ({ streamId, fetchStream, stream, editStream }) => {
  //////+++++++++++++++++++++++++++++++++++++++++//////

  useEffect(() => {
    fetchStream(streamId);
  }, []);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const onSubmit = (formValues) => {
    editStream(streamId, formValues);
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  if (!stream) {
    return <div>Loading...</div>;
  }
  const editStreamObject = _.pick(stream, "title", "description");
  return (
    <div>
      <h3>Edit stream</h3>
      <StreamForm
        onSubmit={onSubmit}
        initialValues={editStreamObject}
        enableReinitialize={true}
      />
    </div>
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
  fetchStream,
  editStream,
})(StreamEdit);
