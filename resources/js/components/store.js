import { createStore, applyMiddleware, compose, Store } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers";

const intialState = {};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  intialState,
  compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
