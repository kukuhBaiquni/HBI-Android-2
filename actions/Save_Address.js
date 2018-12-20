import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const saveAddress = (data) => {
  return { type: 'SAVE_ADDRESS' };
};

const saveAddressSuccess = () => {
  return { type: 'SAVE_ADDRESS_SUCCESS' };
};

const saveAddressFailed = () => {
  return { type: 'SAVE_ADDRESS_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherSaveAddress(data) {
  yield takeEvery('SAVE_ADDRESS', workerSaveAddress);
};

function* workerSaveAddress(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}android/counting-items`)
      .send({id: form.data.id})
      .send({qty: form.data.qty})
      .send({token: form.data.token})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.result) {
      yield put(saveAddressSuccess());
    }else{
      yield put(saveAddressFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
