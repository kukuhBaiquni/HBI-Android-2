import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const facebookRegister = (data) => {
  return { type: 'FACEBOOK_REGISTER', data };
};

const loginAttemptSuccess = (data) => {
  return { type: 'LOGIN_ATTEMPT_SUCCESS', data };
};

const registerFailed = (message) => {
  return { type: 'REGISTER_FAILED', message};
};

const registerSuccess = (message) => {
  return { type: 'REGISTER_SUCCESS', message};
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherFacebookRegister(data) {
  yield takeEvery('FACEBOOK_REGISTER', workerFacebookRegister);
};

function* workerFacebookRegister(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}register/external`)
      .send({name: form.data.name})
      .send({email: form.data.email})
      .send({password: form.data.password})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var message = raw;
    if (message.token) {
      yield put(loginAttemptSuccess(message.token));
      yield put(registerSuccess(message));
    }else{
      yield put(registerFailed(message));
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
