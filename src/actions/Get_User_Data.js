import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL, ERROR_TYPE } from '../../config';

export const fetchUser = (token) => {
    return { type: 'FETCH_USER_DATA', token }
};

const fetchUserSuccess = (data) => {
    return { type: 'FETCH_USER_SUCCESS', data }
};

const fetchUserFailed = (message) => {
    return { type: 'FETCH_USER_FAILED', message };
};

export const logOutRequest = () => {
    return { type: 'LOGOUT_SUCCESS' };
};

export function* watcherFecthUserData(token) {
    yield takeEvery('FETCH_USER_DATA', workerFetchUserData);
};

function* workerFetchUserData(data) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}profile/get_user`)
            .set('Authorization', data.token)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(fetchUserSuccess(data.data));
        }
    }catch (error) {
        const message = ERROR_TYPE(error.status);
        yield put(fetchUserFailed(message));
    }
};
