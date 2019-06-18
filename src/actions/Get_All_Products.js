import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

// TYPE : GET ALL PRODUCTS => TRIGGER (EXPORTED)
export const getAllProducts = () => {
    return { type: 'GET_ALL_PRODUCTS' };
};

const getAllProductSuccess = (data) => {
    return { type: 'GET_ALL_PRODUCTS_SUCCESS', data}; // To Reducer List_Products.js
};

const getAllProductFailed = () => {
    return { type: 'GET_ALL_PRODUCTS_FAILED' };
};

export const resetGetAllProductState = () => {
    return { type: 'RESET_GET_ALL_PRODUCTS_STATE' };
};

// WATCHER & WORKER
// ============================================================
export function* watcherGetAllProducts() {
    yield takeEvery('GET_ALL_PRODUCTS', workerGetAllProducts);
};

function* workerGetAllProducts() {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}products?all=1`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw.data;
        yield put(getAllProductSuccess(data));
    }catch (error) {
        yield put(getAllProductFailed());
    }
};
// ============================================================
