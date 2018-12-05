import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const submitFormRegister = (data) => {
  return { type: 'SUBMIT_FORM_REGISTER', data}
};

const registerSuccess = (data) => {
  return { type: 'REGISER_SUCCESS', data}
};

// GLOBAL STATUS
const requestDone = () => {
  return { type: 'REQUEST_DONE' }; // To Reducer Global_Status.js
};

const requestFailed = () => {
  return { type: 'REQUEST_FAILED' }; // To Reducer Global_Status.js
};

export function* watcherRegister(data) {
  yield takeEvery('SUBMIT_FORM_REGISTER', workerRegister);
};

function* workerRegister(data) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}register`)
      .send({name: data.data.name})
      .send({email: data.data.email})
      .send({password: data.data.password})
      .then((res) => {
        return res
      })
    })
    var raw = JSON.parse(response.xhr._response);
    console.log(raw);
    yield put(requestDone());
  }catch (error) {
    yield put(requestFailed());
  }
};
