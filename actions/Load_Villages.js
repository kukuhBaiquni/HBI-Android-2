import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const loadVillages = (data) => {
  return { type: 'LOAD_VILLAGES', data };
};

const loadVillagesSuccess = (data) => {
  return { type: 'LOAD_VILLAGES_SUCCESS', data };
};

const loadVillagesFailed = () => {
  return { type: 'LOAD_VILLAGES_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadVillages(data) {
  yield takeEvery('LOAD_VILLAGES', workerLoadVillages);
};

function* workerLoadVillages(form) {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}utility/getvillages/${form.data}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw.data;
      if (data.length !== 0) {
        yield put(loadVillagesSuccess(data));
      }else{
        yield put(loadVillagesFailed())
      }
  }catch (error) {
    yield put(InternalServerError());
  }
}
