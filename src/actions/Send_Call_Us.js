import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const sendForm = (data) => {
  return { type: 'SEND_FORM', data };
};

const sendFormSuccess = () => {
  return { type: 'SEND_FORM_SUCCESS' };
};

const sendFormFailed = () => {
  return { type: 'SEND_FORM_FAILED' };
};

export const resetStatus = () => {
  return { type: 'RESET_SEND_FORM_STATE' };
};

export function* watcherSendForm(data) {
  yield takeEvery('SEND_FORM', workerSendForm);
};

function* workerSendForm(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}android/request/call-us/form`)
      .send({email: form.data.email})
      .send({text: form.data.text})
      .send({type: form.data.type})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(sendFormSuccess())
    }else{
      yield put(sendFormFailed())
    }
  }catch (error) {
    yield put(sendFormFailed());
  }
}
