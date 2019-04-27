import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const loadTransactionTypeFailed = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_FAILED', data };
};

const loadTransactionTypeFailedSuccess = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_FAILED_SUCCESS', data };
};

const loadTransactionTypeFailedFailed = () => {
    return { type: 'LOAD_TRANSACTION_TYPE_FAILED_FAILED' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadTransactionTypeFailed(data) {
    yield takeEvery('LOAD_TRANSACTION_TYPE_FAILED', workerLoadTransactionTypeFailed );
};

function* workerLoadTransactionTypeFailed(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}profile/android/user-transaction/failed`)
            .set('Authorization', form.data)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(loadTransactionTypeFailedSuccess(data.data));
        }else{
            yield put(loadTransactionTypeFailedFailed())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
