import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const submitFormRegister = (data) => {
  return { type: 'SUBMIT_FORM_REGISTER', data};
};

export const forceResetRG = () => {
  return { type: 'RESET_REGISTER_STATE' };
};

const registerSuccess = (message) => {
  return { type: 'REGISTER_SUCCESS', message};
};

const registerFailed = (message) => {
  return { type: 'REGISTER_FAILED', message};
};

export const registerFailedPrototype = () => {
  return { type: 'REGISTER_FAILED_PROTOTYPE' }
}

export function* watcherRegister(data) {
  yield takeEvery('SUBMIT_FORM_REGISTER', workerRegister);
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

function* workerRegister(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}register`)
      .send({name: form.data.name})
      .send({email: form.data.email})
      .send({password: form.data.password})
      .then((res) => {
        return res
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var message = raw;
    if (message.success) {
      yield put(registerSuccess(message));
    }else{
      yield put(registerFailed(message));
    };
  }catch (error) {
    yield put(InternalServerError());
  }
};
