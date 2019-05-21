import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const loadCustomContent = (data) => {
  return { type: 'LOAD_CUSTOM_CONTENT', data };
};

const loadCustomContentSuccess = (data) => {
  return { type: 'LOAD_CUSTOM_CONTENT_SUCCESS', data };
};

const loadCustomContentFailed = () => {
  return { type: 'LOAD_CUSTOM_CONTENT_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherLoadCustomContent(data) {
  yield takeEvery('LOAD_CUSTOM_CONTENT', workerLoadCustomContent);
};

function* workerLoadCustomContent(form) {
  try{
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}android/request/custom-content/${form.data}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(loadCustomContentSuccess(data));
    }else{
      yield put(loadCustomContentFailed());
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
