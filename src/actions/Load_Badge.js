import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const loadBadge = (data) => {
    return { type: 'LOAD_BADGE', data };
};

const loadBadgeSuccess = (data) => {
    return { type: 'LOAD_BADGE_SUCCESS', data };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' };
}

export function* watcherLoadBadge(data) {
    yield takeEvery('LOAD_BADGE', workerLoadBadge);
};

function* workerLoadBadge(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}non-member/count-badge`)
            .set('Authorization', form.data)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(loadBadgeSuccess(data.data));
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
