import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const loadDistricts = (data) => {
  return { type: 'LOAD_DISTRICTS', data };
};

const loadDistrictsSuccess = (data) => {
  return { type: 'LOAD_DISTRICTS_SUCCESS', data };
};

const loadDistrictsFailed = () => {
  return { type: 'LOAD_DISTRICTS_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadDistricts(data) {
  yield takeEvery('LOAD_DISTRICTS', workerLoadDistricts);
};

function* workerLoadDistricts(form) {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}utility/getdistricts/${form.data}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw.data;
      if (data.length !== 0) {
        yield put(loadDistrictsSuccess(data));
      }else{
        yield put(loadDistrictsFailed())
      }
  }catch (error) {
    yield put(InternalServerError());
  }
}
