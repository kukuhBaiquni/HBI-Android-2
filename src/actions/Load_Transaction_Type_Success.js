import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const loadTransactionTypeSuccess = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_SUCCESS', data };
};

const loadTransactionTypeSuccessSuccess = (data) => {
    return { type: 'LOAD_TRANSACTION_TYPE_SUCCESS_SUCCESS', data };
};

const loadTransactionTypeSuccessFailed = () => {
    return { type: 'LOAD_TRANSACTION_TYPE_SUCCESS_FAILED' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherLoadTransactionTypeSuccess(data) {
    yield takeEvery('LOAD_TRANSACTION_TYPE_SUCCESS', workerLoadTransactionTypeSuccess );
};

function* workerLoadTransactionTypeSuccess(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}profile/android/user-transaction/success`)
            .set('Authorization', form.data)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(loadTransactionTypeSuccessSuccess(data.data));
        }else{
            yield put(loadTransactionTypeSuccessFailed())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
