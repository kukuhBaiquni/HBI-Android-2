import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const sendEmail = (data) => {
    return {
        type: 'SEND_EMAIL',
        email: data
    }
};

const sendEmailSuccess = (email) => {
    return {
        type: 'SEND_EMAIL_SUCCESS',
        data: email
    }
};

const sendEmailFailed = (error) => {
    return {
        type: 'SEND_EMAIL_FAILED',
        statusCode: error
    }
};

export const resetSendEmailState = () => {
    return {
        type: 'RESET_SEND_EMAIL_STATE'
    }
};

export function* watcherSendEmail(data) {
    yield takeEvery('SEND_EMAIL', workerSendEmail);
};

function* workerSendEmail(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}forget-password/send-email`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({email: form.email})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        yield put(sendEmailSuccess(raw.email))
    }catch (error) {
        yield put(sendEmailFailed(error.response.statusCode))
    }
};
