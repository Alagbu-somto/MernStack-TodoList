import { createStore, combineReducers } from "redux";
import reducer from "./TodolistReducer";
import loggedReducer from "./isloggedreducer";
const allReducers = combineReducers({ reducer, loggedReducer });
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
