import { all } from "redux-saga/effects";

import cart from "./cart/sagas";

//function* === async function
//yield === await
export default function* rootSaga() {
  return yield all([cart]);
}
