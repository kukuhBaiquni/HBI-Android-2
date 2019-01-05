import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const fetchUser = (token) => {
  return { type: 'FETCH_USER_DATA', token }
};

const fetchUserSuccess = (data) => {
  return { type: 'FETCH_USER_SUCCESS', data }
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherFecthUserData(token) {
  yield takeEvery('FETCH_USER_DATA', workerFetchUserData);
};

function* workerFetchUserData(data) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}profile/get_user`)
      .send({token: data.token})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw.data;
    yield put(fetchUserSuccess(data));
  }catch (error) {
    yield put(InternalServerError());
  }
}
