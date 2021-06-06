import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary"
import store from "./redux/todosReducer"
import { Provider } from "react-redux"

ReactDOM.render(
  <React.StrictMode>
      <ErrorBoundary>
          <CssBaseline />
          <Provider store={store}>
              <App />
          </Provider>
      </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
