import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const checkEmail = (email) => {
  return { type: 'CHECK_EMAIL', email };
};

export const forceResetCE = () => {
  return { type: 'RESET_CHECK_EMAIL_STATE' }
}

const emailFree = () => {
  return { type: 'EMAIL_FREE' };
};

const loginAttemptSuccess = (data) => {
  return { type: 'LOGIN_ATTEMPT_SUCCESS', data };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherCheckEmail(target) {
  yield takeEvery('CHECK_EMAIL', workerCheckEmail);
};

function* workerCheckEmail(data) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}check_email/if_registered/go_login`)
      .send({email: data.email})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.token) {
      yield put(loginAttemptSuccess(data.token))
    }else if(data.free) {
      yield put(emailFree())
    }else{
      yield put(InternalServerError())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
