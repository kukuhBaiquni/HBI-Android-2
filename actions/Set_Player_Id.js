import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const setPlayerId = (data) => {
  return { type: 'SET_PLAYER_ID', data };
};

export function* watcherSetPlayerId(data) {
  yield takeEvery('SET_PLAYER_ID', workerSetPlayerId);
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

function* workerSetPlayerId(form) {
  try{
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}set-player-id/${form.data.ids}/${form.data.token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
  }catch (error) {
    yield put(InternalServerError());
  }
}
