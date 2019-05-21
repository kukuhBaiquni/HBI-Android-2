import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const readingNotification = (data) => {
    return { type: 'READING_NOTIFICATION', data };
};

const readingNotificationSuccess = (data) => {
    return { type: 'READING_NOTIFICATION_SUCCESS', data };
};

const readingNotificationFailed = () => {
    return { type: 'READING_NOTIFICATION_FAILED' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherReadingNotification(data) {
    yield takeEvery('READING_NOTIFICATION', workerReadingNotification);
};

function* workerReadingNotification(form) {
    console.log(form);
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}android/request/reading-notification`)
            .set('Authorization', form.data.token)
            .send({id: form.data.id})
            .send({type: form.data.type})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw.data;
        if (data.success) {
            yield put(readingNotificationSuccess(data));
        }else{
            yield put(readingNotificationFailed())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
