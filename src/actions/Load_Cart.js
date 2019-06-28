import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const loadCart = (data) => {
    return { type: 'LOAD_CART', data };
};

const loadCartSuccess = (data) => {
    return { type: 'LOAD_CART_SUCCESS', data};
};

const loadCartFailed = () => {
    return { type: 'LOAD_CART_FAILED' };
};

const cartTotal = (data) => {
    return { type: 'CART_TOTAL', data };
};

export function* watcherLoadCart(data) {
    yield takeEvery('LOAD_CART', workerLoadCart);
};

function* workerLoadCart(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}users/${form.data.id}/cart`)
            .set('Authorization', form.data.token)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        console.log(data);
        yield put(loadCartSuccess(data.data));
    }catch (error) {
        console.log(error.response);
        yield put(loadCartFailed());
    }
};
