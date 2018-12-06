import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const countItem = (data) => {
  return { type: 'COUNT_ITEM', data };
};

const countItemSuccess = (data) => {
  return { type: 'COUNT_ITEM_SUCCESS', data };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherCountItem(data) {
  yield takeEvery('COUNT_ITEM', workerCountItem);
};

function* workerCountItem(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}android/counting-items`)
      .send({id: form.data.id})
      .send({qty: form.data.qty})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.result) {
      yield put(countItemSuccess(data));
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
