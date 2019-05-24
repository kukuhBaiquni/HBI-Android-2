import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const loadCart = (token) => {
  return { type: 'LOAD_CART', token };
};

const loadCartWithDataSuccess = (data) => {
  return { type: 'LOAD_CART_WITH_DATA_SUCCESS', data };
};

const loadCartSuccess = () => {
  return { type: 'LOAD_CART_SUCCESS'};
};

const loadCartFailed = () => {
  return { type: 'LOAD_CART_FAILED' };
};

const forceResetLC = () => {
  return { type: 'RESET_LOAD_CART_STATE' };
};

const cartTotal = (data) => {
  return { type: 'CART_TOTAL', data };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadCart(token) {
  yield takeEvery('LOAD_CART', workerLoadCart);
};

function* workerLoadCart(data) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}load-cart`)
      .send({token: data.token})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(loadCartWithDataSuccess(data.data));
      yield put(loadCartSuccess())
    }else{
      yield put(loadCartFailed());
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
