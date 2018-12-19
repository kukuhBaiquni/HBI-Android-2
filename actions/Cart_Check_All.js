import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const cartCheckAll = (data) => {
  return { type: 'CART_CHECK_ALL', data };
};

export const forceResetCA = () => {
  return { type: 'RESET_CHECK_ALL_STATE' };
};

const cartCheckAllSuccess = (data) => {
  return { type: 'CART_CHECK_ALL_SUCCESS', data };
};

const cartCheckAllFailed = () => {
  return { type: 'CART_CHECK_ALL_FAILED' };
};

const cartTotal = (data) => {
  return { type: 'CART_TOTAL', data };
};

export function* watcherCartCheckAll(data) {
  yield takeEvery('CART_CHECK_ALL', workerCartCheckAll);
};

function* workerCartCheckAll(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}c-all/${form.data.mode}`)
      .send({token: form.data.token})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(cartCheckAllSuccess(data.data));
      yield put(cartTotal(data.total))
    }else{
      yield put(cartCheckAllFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
