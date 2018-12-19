import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const removeItem = (data) => {
  return { type: 'REMOVE_ITEM', data };
};

export const forceResetRI = () => {
  return { type: 'RESET_REMOVE_ITEM_STATE' };
};

const removeItemWithDataSuccess = (data) => {
  return { type: 'REMOVE_ITEM_WITH_DATA_SUCCESS', data };
};

const removeItemSuccess = () => {
  return { type: 'REMOVE_ITEM_SUCCESS' }
}

const removeItemFailed = () => {
  return { type: 'REMOVE_ITEM_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

const cartTotal = (data) => {
  return { type: 'CART_TOTAL', data}
};

export function* watcherRemoveItem(data) {
  yield takeEvery('REMOVE_ITEM', workerRemoveItem);
};

function* workerRemoveItem(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}remove-item/${form.data.id}`)
      .send({token: form.data.token})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      var total = 0;
      data.data.forEach(x => total += x.subtotal)
      yield put(removeItemWithDataSuccess(data.data));
      yield put(removeItemSuccess())
      yield put(cartTotal(total))
    }else{
      yield put(removeItemFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
