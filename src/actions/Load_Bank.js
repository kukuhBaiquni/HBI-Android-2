import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const loadBank = () => {
    return { type: 'LOAD_BANK' };
};

const loadBankWithDataSuccess = (data) => {
    return { type: 'LOAD_BANK_WITH_DATA_SUCCESS', data };
};

const loadbankSuccess = () => {
    return { type: 'LOAD_BANK_SUCCESS' };
};

const loadBankFailed = () => {
    return { type: 'LOAD_BANK_FAILED' };
};

export const forceResetLB = () => {
    return { type: 'RESET_LOAD_BANK_STATE' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherLoadBank() {
    yield takeEvery('LOAD_BANK', workerLoadBank);
};

function* workerLoadBank() {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}utility/get_bank`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(loadBankWithDataSuccess(data.data));
            yield put(loadbankSuccess())
        }else{
            yield put(loadBankFailed())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
