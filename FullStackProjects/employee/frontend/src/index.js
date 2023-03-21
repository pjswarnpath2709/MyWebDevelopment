import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <App />
    </Provider>
  </React.StrictMode>
);
