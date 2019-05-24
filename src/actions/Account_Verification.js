import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const accountVerification = (hash) => {
  return { type: 'ACCOUNT_VERIFICATION', hash };
};

export const forceResetAV = () => {
  return { type: 'RESET_ACCOUNT_VERIFICATION_STATE' };
};

const accountVerificationSuccess = (message) => {
  return { type: 'ACCOUNT_VERIFICATION_SUCCESS', message };
};

const accountVerificationFailed = (message) => {
  return { type: 'ACCOUNT_VERIFICATION_FAILED', message };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherAccountVerification(hash) {
  yield takeEvery('ACCOUNT_VERIFICATION', workerAccountVerification);
};

function* workerAccountVerification(url) {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}account_verification/android/${url.hash}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.status === 'Success') {
      yield put(accountVerificationSuccess(data.message))
    }else{
      yield put(accountVerificationFailed(data.message))
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
