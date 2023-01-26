import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import App from "./App";

//////-------------------------------------------------------------------------------------------------------------------------------//////

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

//////-------------------------------------------------------------------------------------------------------------------------------//////

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);
