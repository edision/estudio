import "./css/site.css";

import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router } from "react-router";
import { Provider } from "mobx-react";

import stores from "./stores";
import App from "COMPONENTS/App";

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
