import React from "react";
import { render } from "react-dom";
import { App } from "./App/App";
import reportWebVitals from "./reportWebVitals";

function Index() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

render(<Index />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
