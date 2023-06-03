import { call, put } from "redux-saga/effects";
import { requestGetEmployee } from "../requests/employee";
import { setEmployees } from "../../employeeReducer";

export function* handleGetEmployee(action) {
  try {
    console.log("calling handleGetEmployee");
    const response = yield call(requestGetEmployee);
    const { data } = response;
    yield put(setEmployees(data));
  } catch (err) {
    console.log(err);
  }
}
