// import the react and react-dom libraries
import React from "react";
import ReactDOM from "react-dom/client";

// create a react components
const App = function () {
  return <div>Hi there!</div>;
};
// take the react component and show it on the screen
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
