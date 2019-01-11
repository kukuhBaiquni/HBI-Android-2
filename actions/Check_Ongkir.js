import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const checkOngkir = (data) => {
  return { type: 'CHECK_ONGKIR', data };
};

const ongkirAcquired = (data) => {
  return { type: 'ONGKIR_ACQUIRED', data };
};

const ongkirFailed = () => {
  return { type: 'ONGKIR_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR ' };
};

export function* watcherCheckOngkir(data) {
  yield takeEvery('CHECK_ONGKIR', workerCheckOngkir);
};

function* workerCheckOngkir(form) {
  console.log(form);
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}android/counting-items`)
      .send({id: form.data})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(ongkirAcquired(data.result));
    }else{
      yield put(ongkirFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
