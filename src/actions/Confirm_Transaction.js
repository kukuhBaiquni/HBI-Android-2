import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const confirmTransaction = (data) => {
    return { type: 'CONFIRM_TRANSACTION', data };
};

const transactionData = (data) => {
    return { type: 'TRANSACTION_DATA', data };
};

const confirmTransactionSuccess = () => {
    return { type: 'CONFIRM_TRANSACTION_SUCCESS' };
};

const confirmTransactionFailed = () => {
    return { type: 'CONFIRM_TRANSACTION_FAILED' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherConfirmTransaction(data) {
    yield takeEvery('CONFIRM_TRANSACTION', workerConfirmTransaction);
};

function* workerConfirmTransaction(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}non-member/transaction`)
            .set('Authorization', form.data.token)
            .send({receiver: form.data.name})
            .send({receiver_phone: form.data.phone})
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
        console.log(data);
        if (data.success) {
            yield put(confirmTransactionSuccess());
            yield put(transactionData(data.data))
        }else{
            yield put(confirmTransactionFailed())
        }
    }catch (error) {
        console.log(error.response.statusCode);
        yield put(InternalServerError());
    }
}
