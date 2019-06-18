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
    console.log(form);
    try {
        // var response = yield call(() => {
        //     return request
        //     .get(`${SERVER_URL}users/${data.}`)
        //     .set('Authorization', data.token)
        //     .then((res) => {
        //         return res;
        //     })
        // })
        // var raw = JSON.parse(response.xhr._response);
        // var data = raw;
        // if (data.success) {
        //     yield put(fetchUserSuccess(data.data));
        // }
    }catch (error) {
        console.log(error.response);
        const message = ERROR_TYPE(error.status);
        yield put(fetchUserFailed(message));
    }
};
