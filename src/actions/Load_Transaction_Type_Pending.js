import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../../config';

export const loadTransactionTypePending = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_PENDING', data };
};

const loadTransactionTypePendingSuccess = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_PENDING_SUCCESS', data };
};

const loadTransactionTypePendingFailed = () => {
    return { type: 'LOAD_TRANSACTION_TYPE_PENDING_FAILED' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadTransactionTypePending(data) {
    yield takeEvery('LOAD_TRANSACTION_TYPE_PENDING', workerLoadTransactionTypePending );
};

function* workerLoadTransactionTypePending(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}profile/android/user-transaction/pending`)
            .set('Authorization', form.data)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        console.log(data);
        if (data.success) {
            yield put(loadTransactionTypePendingSuccess(data.data));
        }else{
            yield put(loadTransactionTypePendingFailed())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
