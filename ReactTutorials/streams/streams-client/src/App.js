import React from "react";

import { Route, Routes } from "react-router-dom";
import { history } from "./history";
import CustomRouter from "./components/CustomRouter";

//////-------------------------------------------------------------------------------------------------------------------------------//////
import {
  STREAM_CREATE,
  STREAM_EDIT,
  STREAM_SHOW,
  STREAMS_LIST,
  STREAM_DELETE,
} from "./routerPaths";
import StreamCreate from "./components/streams/StreamCreate";
import StreamDelete from "./components/streams/StreamDelete";
import Header from "./components/Header";
import StreamEdit from "./components/streams/StreamEdit";
import StreamList from "./components/streams/StreamList";
import StreamShow from "./components/streams/StreamShow";

//////-------------------------------------------------------------------------------------------------------------------------------//////

const App = () => {
  return (
    <div className="ui container">
      <CustomRouter history={history}>
        <Header />
        <Routes>
          <Route path={STREAM_DELETE} element={<StreamDelete />} />
          <Route path={STREAM_CREATE} element={<StreamCreate />} />
          <Route path={STREAM_EDIT} element={<StreamEdit />} />
          <Route path={STREAM_SHOW} element={<StreamShow />} />
          <Route path={STREAMS_LIST} element={<StreamList />} />
        </Routes>
      </CustomRouter>
    </div>
  );
};

export default App;
