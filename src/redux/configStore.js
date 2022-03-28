import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import dictionary from "./modules/dictionary";
import thunk from "redux-thunk";

const milddlewares = [thunk];
const rootReducer = combineReducers({ dictionary });
const enhancer = applyMiddleware(...milddlewares);

const store = createStore(rootReducer, enhancer);

export default store;
