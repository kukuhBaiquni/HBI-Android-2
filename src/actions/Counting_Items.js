import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const countItem = (data) => {
    console.log('exe');
    return { type: 'COUNT_ITEM', data };
};

const countItemSuccess = (data) => {
    return { type: 'COUNT_ITEM_SUCCESS', data };
};

const countItemFailed = () => {
    return { type: 'COUNT_ITEM_FAILED' };
};

export const resetCountItem = () => {
    return { type: 'RESET_COUNT_ITEM' };
};

export function* watcherCountItem(data) {
    yield takeEvery('COUNT_ITEM', workerCountItem);
};

function* workerCountItem(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}util/realtime/price`)
            .set('Authorization', form.data.token)
            .send({productId: form.data.productId})
            .send({qty: form.data.qty})
            .send({status: form.data.status})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        yield put(countItemSuccess(data));
    }catch (error) {
        yield put(countItemFailed())
    }
}
