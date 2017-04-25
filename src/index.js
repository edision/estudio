import "./css/site.css";

import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";

import stores from "./stores";
import App from "COMPONENTS/app";

ReactDOM.render(
  <AppContainer>
    <Provider {...stores}>
      <Router>
        <App />
      </Router>
    </Provider>
  </AppContainer>
  , document.getElementById("app"));

// Hot-reloading
if (module.hot) {
  module.hot.accept();
}
