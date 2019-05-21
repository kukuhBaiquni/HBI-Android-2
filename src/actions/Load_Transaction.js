import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const loadTransaction = (data) => {
  return { type: 'LOAD_TRANSACTION', data };
};

const loadTransactionWithDataSuccess = (data) => {
  return { type: 'LOAD_TRANSACTION_WITH_DATA_SUCCESS', data };
};

const loadTransactionSuccess = () => {
  return { type: 'LOAD_TRANSACTION_SUCCESS' };
};

const loadTransactionFailed = () => {
  return { type: 'LOAD_TRANSACTION_FAILED' };
};

export const forceResetLT = () => {
  return { type: 'RESET_LOAD_TRANSACTION_STATE' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadTransaction(data) {
  yield takeEvery('LOAD_TRANSACTION', workerLoadTransaction);
};

function* workerLoadTransaction(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}profile/android/user-transaction/${form.data.type}`)
      .send({token: form.data.token})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(loadTransactionWithDataSuccess(data.data));
      yield put(loadTransactionSuccess())
    }else{
      yield put(loadTransactionFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
