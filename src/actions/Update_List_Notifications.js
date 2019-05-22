import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const updateListNotifications = (data) => {
  return { type: 'UPDATE_LIST_NOTIFICATIONS', data };
};

const newData = (data) => {
  return { type: 'INCOMING_NOTIFICATIONS', data };
};

export function* watcherUpdateListNotifications(data) {
  yield takeEvery('UPDATE_LIST_NOTIFICATIONS', workerUpdateListNotifications);
};

function* workerUpdateListNotifications(form) {
  yield put(newData(form.data))
}
