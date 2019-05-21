import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const cartCheckPartial = (data) => {
  return { type: 'CART_CHECK_PARTIAL', data};
};

export const forceResetCP = () => {
  return { type: 'RESET_CHECK_PARTIAL_STATE' };
};

const cartCheckPartialSuccess = (data) => {
  return { type: 'CART_CHECK_PARTIAL_SUCCESS', data }
};

const cartCheckPartialFailed = () => {
  return { type: 'CART_CHECK_PARTIAL_FAILED' }
};

const cartTotal = (data) => {
  return { type: 'CART_TOTAL', data}
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherCartCheckPartial(data) {
  yield takeEvery('CART_CHECK_PARTIAL', workerCartCheckPartial);
};

function* workerCartCheckPartial(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}c-partial/${form.data.mode}/${form.data.id}`)
      .send({token: form.data.token})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(cartCheckPartialSuccess(data.data));
      yield put(cartTotal(data.total));
    }else{
      yield put(cartCheckPartialFailed());
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
