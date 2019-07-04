import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const submitFormRegister = (data) => {
    return { type: 'SUBMIT_FORM_REGISTER', data};
};

const registerSuccess = (data) => {
    return { type: 'REGISTER_SUCCESS', data};
};

const registerFailed = (data) => {
    return { type: 'REGISTER_FAILED', data};
};

export const registerFailedPrototype = () => {
    return { type: 'REGISTER_FAILED_PROTOTYPE' }
}

export function* watcherRegister(data) {
    yield takeEvery('SUBMIT_FORM_REGISTER', workerRegister);
};

function* workerRegister(form) {
    console.log(form);
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}users`)
            .send({personalIdentity: form.data.personalIdentity})
            .then((res) => {
                return res
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        console.log(data);
        // yield put(registerSuccess(data));
    }catch (error) {
        console.log(error.response);
        // yield put(registerFailed(data));
    }
};
