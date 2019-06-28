import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const removeItem = (data) => {
    return { type: 'REMOVE_ITEM', data };
};

const removeItemSuccess = (data) => {
    return { type: 'REMOVE_ITEM_SUCCESS', data }
};

const removeItemFailed = () => {
    return { type: 'REMOVE_ITEM_FAILED' };
};

export function* watcherRemoveItem(data) {
    yield takeEvery('REMOVE_ITEM', workerRemoveItem);
};

function* workerRemoveItem(form) {
    try {
        var response = yield call(() => {
            return request
            .delete(`${SERVER_URL}users/${form.data.userId}/cart?productId=${form.data.id}`)
            .set('Authorization', form.data.token)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        yield put(removeItemSuccess(data.data));
    }catch (error) {
        yield put(removeItemFailed())
    }
}
