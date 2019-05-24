import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const directPurchase = (data) => {
    return { type: 'DIRECT_PURCHASE', data };
};

const confirmTransactionSuccess = () => {
    return { type: 'CONFIRM_TRANSACTION_SUCCESS' };
};

const confirmTransactionFailed = () => {
    return { type: 'CONFIRM_TRANSACTION_FAILED' };
};

export const resetTransactionState = () => {
    return { type: 'RESET_TRANSACTION_STATE' };
};

const transactionData = (data) => {
    return { type: 'TRANSACTION_DATA', data };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherDirectPurchase(data) {
    yield takeEvery('DIRECT_PURCHASE', workerDirectPurchase);
};

function* workerDirectPurchase(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}non-member/direct_purchase`)
            .set('Authorization', form.data.token)
            .send({name: form.data.name})
            .send({id: form.data.id})
            .send({qty: form.data.qty})
            .send({phone: form.data.phone})
            .send({street: form.data.street})
            .send({city: form.data.city})
            .send({district: form.data.district})
            .send({village: form.data.village})
            .send({no: form.data.no})
            .send({rt: form.data.rt})
            .send({rw: form.data.rw})
            .send({targetMember: form.data.targetMember})
            .send({ongkir: form.data.ongkir})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(confirmTransactionSuccess());
            yield put(transactionData(data.data))
        }else{
            yield put(confirmTransactionFailed())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
