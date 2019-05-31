import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const AppWithRoute = withRouter(App);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppWithRoute />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
