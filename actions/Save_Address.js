import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const saveAddress = (data) => {
  return { type: 'SAVE_ADDRESS', data };
};

export const forceResetSA = () => {
  return { type: 'RESET_SAVE_ADDRESS_STATE' };
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
      .post(`${SERVER_URL}non-member/save-address`)
      .send({phone: form.data.phone})
      .send({street: form.data.street})
      .send({city: form.data.city})
      .send({district: form.data.district})
      .send({village: form.data.village})
      .send({token: form.data.token})
      .send({no: form.data.no})
      .send({rt: form.data.rt})
      .send({rw: form.data.rw})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(saveAddressSuccess());
    }else{
      yield put(saveAddressFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
