import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const addToCart = (data) => {
    return { type: 'ADD_TO_CART', data };
};

const addToCartSuccess = (data) => {
    return { type: 'ADD_TO_CART_SUCCESS', data };
};

const addToCartFailed = () => {
    return { type: 'ADD_TO_CART_FAILED' };
};

export const resetAddToCart = () => {
    return { type: 'RESET_CART_STATE' };
};

export function* watcherAddtoCart(data) {
    yield takeEvery('ADD_TO_CART', workerAddtoCart);
};

function* workerAddtoCart(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}users/${form.data.userId}/cart`)
            .set('Authorization', form.data.token)
            .send({qty: form.data.qty})
            .send({packing: form.data.packing})
            .send({productId: form.data.id})
            .send({productName: form.data.productName})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        yield put(addToCartSuccess(data.data));
    }catch (error) {
        yield put(addToCartFailed());
    }
};
