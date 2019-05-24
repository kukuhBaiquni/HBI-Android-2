import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const loadTransactionTypeExpired = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_EXPIRED', data };
};

const loadTransactionTypeExpiredSuccess = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_EXPIRED_SUCCESS', data };
};

const loadTransactionTypeExpiredFailed = () => {
    return { type: 'LOAD_TRANSACTION_TYPE_EXPIRED_FAILED' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadTransactionTypeExpired(data) {
    yield takeEvery('LOAD_TRANSACTION_TYPE_EXPIRED', workerLoadTransactionTypeExpired );
};

function* workerLoadTransactionTypeExpired(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}profile/android/user-transaction/expired`)
            .set('Authorization', form.data)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        console.log(data);
        if (data.success) {
            yield put(loadTransactionTypeExpiredSuccess(data.data));
        }else{
            yield put(loadTransactionTypeExpiredFailed())
        }
    }catch (error) {
        console.log(error);
        yield put(InternalServerError());
    }
}
