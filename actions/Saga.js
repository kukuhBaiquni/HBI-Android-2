import { put, call, takeEvery, all } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

// TYPE : GET ALL USER => TRIGGER (EXPORTED)
export const getAllProducts = () => {
  return { type: 'GET_ALL_PRODUCTS' };
};

const getAllProducts_success = (data) => {
  return { type: 'GET_ALL_PRODUCTS_SUCCESS', data}; // To Reducer data.js
};

// GLOBAL STATUS
const requestDone = () => {
  return { type: 'REQUEST_DONE' }; // To Reducer global_status.js
};

const requestFailed = () => {
  return { type: 'REQUEST_FAILED' }; // To Reducer global_status.js
};

// WATCHER & WORKER (GET ALL PRODUCTS)
// ============================================================
function* watcherGetAllProducts() {
  yield takeEvery('GET_ALL_PRODUCTS', workerGetAllProducts);
};

function* workerGetAllProducts() {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}android/get_all_products`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw.data;
    yield put(getAllProducts_success(data));
    yield put(requestDone());
  }catch (error) {
    yield put(requestFailed());
  }
};
// ============================================================

export default function* rootSaga() {
  yield all([
    watcherGetAllProducts()
  ]);
};
