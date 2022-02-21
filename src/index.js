import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
// for dev
// import { BrowserRouter as Router } from "react-router-dom";
// for production
import { HashRouter as Router } from "react-router-dom";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();
const middlewares = [thunk, logger];
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
