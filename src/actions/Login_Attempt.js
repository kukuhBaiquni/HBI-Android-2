import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';
import { setInitialToken } from './Set_Initial_Token';

export const submitFormLogin = (data) => {
    return { type: 'SUBMIT_FORM_LOGIN', data };
};

export const resetToken = () => {
    return { type: 'RESET_TOKEN' };
};

export const forceResetLG = () => {
    return { type: 'RESET_LOGIN_STATE' };
};

const loginFailed = (message) => {
    return { type: 'LOGIN_FAILED', message };
};

export const resetTokenState = () => {
    return { type: 'RESET_TOKEN_STATE' };
};

// =================================

export function* watcherLoginAttempt(data) {
    yield takeEvery('SUBMIT_FORM_LOGIN', workerLoginAttempt);
};

function* workerLoginAttempt(data) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}login`)
            .send({email: data.data.email})
            .send({password: data.data.password})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        // {
        //     refreshToken,
        //     token,
        //     userId,
        //     validUntil
        // };
        if (data.data) {
            yield put(setInitialToken(data.data));
        }else{
            yield put(loginFailed());
        }
    }catch (error) {
        yield put(loginFailed());
    }
};
