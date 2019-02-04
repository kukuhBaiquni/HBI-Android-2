import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const loadTransactionTypeExpired = (data) => {
  return { type: 'LOAD_TRANSACTION_TYPE_EXPIRED', data };
};

const loadTransactionTypeExpiredSuccess = (data) => {
  return { type: 'LOAD_TRANSACTION_TYPE_EXPIRED_SUCCESS', data };
};

const loadTransactionTypeExpiredFailed = () => {
  return { type: 'LOAD_TRANSACTION_TYPE_EXPIRED_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadTransactionTypeExpired(data) {
  yield takeEvery('LOAD_TRANSACTION_TYPE_EXPIRED', workerLoadTransactionTypeExpired );
};

function* workerLoadTransactionTypeExpired(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}profile/android/user-transaction/expired`)
      .send({token: form.data})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(loadTransactionTypeExpiredSuccess(data.data));
    }else{
      yield put(loadTransactionTypeExpiredFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
