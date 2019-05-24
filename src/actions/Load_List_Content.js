import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const loadListContent = (data) => {
  return { type: 'LOAD_LIST_CONTENT', data };
};

const loadListContentSuccess = (data) => {
  return { type: 'LOAD_LIST_CONTENT_SUCCESS', data };
};

const loadListContentFailed = () => {
  return { type: 'LOAD_LIST_CONTENT_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherLoadListContent(data) {
  yield takeEvery('LOAD_LIST_CONTENT', workerLoadListContent);
};

function* workerLoadListContent(form) {
  try{
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}android/request/entire/custom-content/${form.data}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(loadListContentSuccess(data));
    }else{
      yield put(loadListContentFailed());
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
