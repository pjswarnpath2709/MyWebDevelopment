import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
} from "./types";

import streams from "../apis/streams";
import { history } from "../history";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userID } = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userID });
    dispatch({ type: CREATE_STREAM, payload: response.data });

    // Programmatic Navigation
    history.push("/");
    // get the user back to the root route
  };
};

export const fetchStreams = () => {
  return async (dispatch) => {
    const { data } = await streams.get("/streams");
    dispatch({ type: FETCH_STREAMS, payload: data });
  };
};

export const fetchStream = (id) => {
  return async (dispatch) => {
    const { data } = await streams.get(`streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: data });
  };
};

export const editStream = (id, formValues) => {
  return async (dispatch, getState) => {
    const { userID } = getState().auth;
    const { data } = await streams.patch(`streams/${id}`, {
      ...formValues,
      userID,
    });
    dispatch({ type: EDIT_STREAM, payload: data });
    history.push("/");
  };
};

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push("/");
  };
};
