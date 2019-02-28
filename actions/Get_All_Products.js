import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

// TYPE : GET ALL PRODUCTS => TRIGGER (EXPORTED)
export const getAllProducts = () => {
  return { type: 'GET_ALL_PRODUCTS' };
};

const getAllProducts_success = (data) => {
  return { type: 'GET_ALL_PRODUCTS_SUCCESS', data}; // To Reducer List_Products.js
};

// GLOBAL STATUS
const requestDone = () => {
  return { type: 'REQUEST_DONE' }; // To Reducer Global_Status.js
};

const requestFailed = () => {
  return { type: 'REQUEST_FAILED' }; // To Reducer Global_Status.js
};

// WATCHER & WORKER
// ============================================================
export function* watcherGetAllProducts() {
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
    console.log(error);
    yield put(requestFailed());
  }
};
// ============================================================
