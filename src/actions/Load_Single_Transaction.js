import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const loadSingleTransaction = (data) => {
  return { type: 'LOAD_SINGLE_TRANSACTION', data };
};

const loadSingleTransactionSuccess = (data) => {
  return { type: 'LOAD_SINGLE_TRANSACTION_SUCCESS', data };
};

const loadSingleTransactionFailed = () => {
  return { type: 'LOAD_SINGLE_TRANSACTION_FAILED' };
};

export function* watcherLoadSingleTransaction(data) {
  yield takeEvery('LOAD_SINGLE_TRANSACTION', workerLoadSingleTransaction);
};

function* workerLoadSingleTransaction(form) {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}transaction/${form.data}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
      if (data.success) {
        yield put(loadSingleTransactionSuccess(data.data));
      }else{
        yield put(loadSingleTransactionFailed());
      }
  }catch (error) {
    yield put(loadSingleTransactionFailed());
  }
}
