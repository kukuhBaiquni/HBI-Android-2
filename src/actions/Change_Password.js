import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const changePassword = (data) => {
    return {
        type: 'CHANGE_PASSWORD',
        data
    }
};

const changePasswordSuccess = () => {
    return {
        type: 'CHANGE_PASSWORD_SUCCESS'
    }
};

const changePasswordFailed = (data) => {
    return {
        type: 'CHANGE_PASSWORD_FAILED',
        statusCode: data
    }
};

export const resetChangePassword = () => {
    return {
        type: 'RESET_CHANGE_PASSWORD_STATE'
    }
};

export function* watcherChangePassword(data) {
    yield takeEvery('CHANGE_PASSWORD', workerChangePassword);
};

function* workerChangePassword(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}forget-password/change-password`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({email: form.data.email})
            .send({password: form.data.newPassword})
            .send({code: form.data.confirmationCode})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        yield put(changePasswordSuccess())
    }catch (error) {
        console.log(error.response.statusCode);
        yield put(changePasswordFailed(error.response.statusCode))
    }
};
