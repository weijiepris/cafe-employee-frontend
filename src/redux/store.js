import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cafeReducer from "./cafeReducer";
import employeeReducer from "./employeeReducer";
import { watcherSaga } from "./sagas/saga";

const reducer = combineReducers({
  cafe: cafeReducer,
  employee: employeeReducer,
});

const sageMiddleware = createSagaMiddleware();

const middleware = [sageMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sageMiddleware.run(watcherSaga);

export default store;
