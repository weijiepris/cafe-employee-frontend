import { takeLatest } from "redux-saga/effects";
import { handleGetEmployee } from "./handlers/employee";
import { GET_EMPLOYEES } from "../employeeReducer";
import { GET_CAFES } from "../cafeReducer";
import { handleGetCafe } from "./handlers/cafe";

export function* watcherSaga() {
  console.log("here in saga");
  yield takeLatest(GET_EMPLOYEES, handleGetEmployee);

  yield takeLatest(GET_CAFES, handleGetCafe);
}
