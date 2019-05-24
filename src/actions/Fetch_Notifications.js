import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const fetchNotifications = (data) => {
  return { type: 'FETCH_NOTIFICATIONS', data };
};

const fetchNotificationsSuccess = (data) => {
  return { type: 'FETCH_NOTIFICATIONS_SUCCESS', data };
};

const fetchNotificationsFailed = () => {
  return { type: 'FETCH_NOTIFICATIONS_FAILED' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherFetchNotifications(data) {
  yield takeEvery('FETCH_NOTIFICATIONS', workerFetchNotifications);
};

function* workerFetchNotifications(form) {
  try {
    var response = yield call(() => {
      return request
      .get(`${SERVER_URL}android/request/notifications`)
      .set('Authorization', form.data.token)
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(fetchNotificationsSuccess(data))
    }else{
      yield put(fetchNotificationsFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
