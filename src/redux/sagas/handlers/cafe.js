import { call, put } from "redux-saga/effects";
import { setCafes } from "../../cafeReducer";
import { requestGetCafe } from "../requests/cafe";

export function* handleGetCafe(action) {
  try {
    console.log("calling handleGetCafe");
    const response = yield call(requestGetCafe);
    const { data } = response;
    yield put(setCafes(data));
  } catch (err) {
    console.log(err);
  }
}
