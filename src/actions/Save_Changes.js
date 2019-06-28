import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const saveChanges = (data) => {
    return { type: 'SAVE_CHANGES', data };
};

const saveChangesSuccess = (data) => {
    return { type: 'SAVE_CHANGES_SUCCESS', data };
};

const saveChangesFailed = () => {
    return { type: 'SAVE_CHANGES_FAILED' };
};

export function* watcherSaveChanges(data) {
    yield takeEvery('SAVE_CHANGES', workerSaveChanges);
};

function* workerSaveChanges(form) {
    try {
        var response = yield call(() => {
            return request
            .put(`${SERVER_URL}users/${form.data.userId}/cart`)
            .set('Authorization', form.data.token)
            .send({qty: form.data.qty})
            .send({packing: form.data.packing})
            .send({productId: form.data.id})
            .send({productName: form.data.productName})
            .then((res) => {
                return res;
            })
        });
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        console.log('00', data);
        yield put(saveChangesSuccess(data.data));
    }catch (error) {
        console.log('00', error.response);
        yield put(saveChangesFailed());
    }
};
