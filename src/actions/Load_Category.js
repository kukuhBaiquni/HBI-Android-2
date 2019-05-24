import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const loadCategory = () => {
  return { type: 'LOAD_CATEGORY' };
};

export const startProcess = () => {
  return { type: 'START_PROCESS_LOAD_CATEGORY' };
};

const loadCategorySuccess = (data) => {
  return { type: 'LOAD_CATEGORY_SUCCESS', data };
};

const loadCategoryFailed = () => {
  return { type: 'LOAD_CATEGORY_FAILED' };
};

const shareToCustomContent = (data) => {
  return { type: 'SHARE_TO_CUSTOM_CONTENT', data };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherLoadCategory(data) {
  yield takeEvery('LOAD_CATEGORY', workerLoadCategory);
};

function* workerLoadCategory() {
  try{
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}android/request/category-content`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(loadCategorySuccess(data.data));
      yield put(shareToCustomContent(data.data));
    }else{
      yield put(loadCategoryFailed());
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
