import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const addToCart = (data) => {
  return { type: 'ADD_TO_CART', data };
};

const addToCartSuccess = () => {
  return { type: 'ADD_TO_CART_SUCCESS' };
};

const loadCartWithDataSuccess = (data) => {
  return { type: 'LOAD_CART_WITH_DATA_SUCCESS', data };
};

const addToCartFailed = () => {
  return { type: 'ADD_TO_CART_FAILED' };
};

export const forceResetATC = () => {
  return { type: 'RESET_ATC_STATE' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherAddtoCart(data) {
  yield takeEvery('ADD_TO_CART', workerAddtoCart);
};

function* workerAddtoCart(product) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}non-member/add-to-cart/${product.data.id}`)
      .set('Authorization', product.data.token)
      .send({qty: product.data.qty})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(loadCartWithDataSuccess(data.data))
      yield put(addToCartSuccess());
    }else{
      yield put(addToCartFailed());
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
