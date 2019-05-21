import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const resetPassword = (data) => {
    return { type: 'RESET_PASSWORD', data };
};

export const startProcess = () => {
    return { type: 'ON_PROCESS' };
};

const endProcess = () => {
    return { type: 'PROCESS_DONE' };
};

const resetPasswordSuccess = (data) => {
    return { type: 'RESET_PASSWORD_SUCCESS', data };
};

const resetPasswordFailed = (data) => {
    return { type: 'RESET_PASSWORD_FAILED', data };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' }
};

export const resetPasswordState = () => {
    return { type: 'RESET_PASSWORD_STATE' };
};

export function* watcherResetPassword(data) {
    yield takeEvery('RESET_PASSWORD', workerResetPassword);
};

function* workerResetPassword(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}profile/user_change_password`)
            .set('Authorization', form.data.token)
            .send({currentPassword: form.data.currentPassword})
            .send({newPassword: form.data.newPassword})
            .send({confirmPassword: form.data.confirmPassword})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(resetPasswordSuccess(data.success));
            yield put(endProcess())
        }else{
            yield put(resetPasswordFailed(data.failure))
            yield put(endProcess())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
