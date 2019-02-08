import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const setPlayerId = (data) => {
  return { type: 'SET_PLAYER_ID', data };
};

const sendToReducer = (data) => {
  return { type: 'MY_PLAYER_ID', data };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherSetPlayerId(data) {
  yield takeEvery('SET_PLAYER_ID', workerSetPlayerId);
};

function* workerSetPlayerId(form) {
  yield put(sendToReducer(form.data));
}
