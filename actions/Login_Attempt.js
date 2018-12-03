import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

// TYPE : POST LOGIN ATTEMPT => TRIGGER (EXPORTED)
export const submitFormLogin = (data) => {
  return { type: 'SUBMIT_FORM_LOGIN', data };
};

const loginAttemptSuccess = (data) => {
  return { type: 'LOGIN_ATTEMPT_SUCCESS', data}; // To Reducer Active_User.js
};

// GLOBAL STATUS
const requestDone = () => {
  return { type: 'REQUEST_DONE' }; // To Reducer Global_Status.js
};

const requestFailed = () => {
  return { type: 'REQUEST_FAILED' }; // To Reducer Global_Status.js
};

// WATCHER & WORKER
// ============================================================
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
    var data = raw
    yield put(loginAttemptSuccess(data));
    yield put(requestDone());
  }catch (error) {
    yield put(requestFailed());
  }
};
// ============================================================
