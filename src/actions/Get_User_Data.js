import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL, ERROR_TYPE } from '../components/basic/supportFunction';

export const fetchUser = (data) => {
    return { type: 'FETCH_USER_DATA', data }
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

function* workerFetchUserData(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}users/${form.data._id}`)
            .set('Authorization', form.data.token)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        yield put(fetchUserSuccess(data.data));
    }catch (error) {
        const message = ERROR_TYPE(error.status);
        yield put(fetchUserFailed(message));
    }
};
