import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary"

ReactDOM.render(
  <React.StrictMode>
      <ErrorBoundary>
          <CssBaseline />
          <App />
      </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
