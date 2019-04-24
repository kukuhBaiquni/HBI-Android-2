import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const setPlayerId = (data) => {
  return { type: 'SET_PLAYER_ID', data };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherSetPlayerId(data) {
  yield takeEvery('SET_PLAYER_ID', workerSetPlayerId);
};

function* workerSetPlayerId(form) {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}non-member/set-player-id/${form.data.ids}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', form.data.token)
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw.data;
  }catch (error) {
    yield put(InternalServerError());
  }
}
