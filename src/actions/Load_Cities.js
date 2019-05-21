import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const loadCities = () => {
  return { type: 'LOAD_CITIES' };
};

export const forceResetRoot = () => {
  return { type: 'RESET_PARTIAL_TERRITORIAL' };
};

export const resetDistricts = () => {
  return { type: 'RESET_DISTRICTS' };
};

export const resetVillages = () => {
  return { type: 'RESET_VILLAGES' };
};

const loadCitiesSuccess = (data) => {
  return { type: 'LOAD_CITIES_SUCCESS', data };
};

const loadCitiesFailed = () => {
  return { type: 'LOAD_CITIES_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadCities() {
  yield takeEvery('LOAD_CITIES', workerLoadCities);
};

function* workerLoadCities() {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}utility/getcities/32`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw.data;
      if (data.length !== 0) {
        yield put(loadCitiesSuccess(data));
      }else{
        yield put(loadCitiesFailed())
      }
  }catch (error) {
    yield put(InternalServerError());
  }
}
