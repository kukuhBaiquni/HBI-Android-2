import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const modifyNotification = (data) => {
  return { type: 'MODIFY_NOTIFICATION', data };
};

const applyModification = (data) => {
  return { type: 'APPLY_MODIFICATION', data };
};

export function* watcherNotificationController(data) {
  yield takeEvery('MODIFY_NOTIFICATION', workerNotificationController);
};

function* workerNotificationController(form) {
  yield put(applyModification(form.data))
}
