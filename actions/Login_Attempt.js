import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const submitFormLogin = (data) => {
  return { type: 'SUBMIT_FORM_LOGIN', data };
};

export const forceResetLG = () => {
  return { type: 'RESET_LOGIN_STATE' };
};

const loginAttemptSuccess = (data) => {
  return { type: 'LOGIN_ATTEMPT_SUCCESS', data };
};

const loginError = (message) => {
  return { type: 'LOGIN_ERROR', message }
};

const loginSuccess = () => {
  return { type: 'LOGIN_SUCCESS' }
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

// =================================

export function* watcherLoginAttempt(data) {
  yield takeEvery('SUBMIT_FORM_LOGIN', workerLoginAttempt);
};

function* workerLoginAttempt(data) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}loginattempt`)
      .send({email: data.data.email})
      .send({password: data.data.password})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.token) {
      yield put(loginAttemptSuccess(data.token));
      yield put(loginSuccess())
    }else{
      yield put(loginError(data.failure));
    }
  }catch (error) {
    yield put(InternalServerError());
  }
};
