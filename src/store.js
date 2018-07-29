import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
// import new reducer now


// add new reducers to combineReducers
const store = createStore(
    combineReducers({ userReducer }),
    applyMiddleware(promiseMiddleware()));

export default store;
