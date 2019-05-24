import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const editRekening = (data) => {
    return { type: 'EDIT_REKENING', data };
};

const editRekeningWithDataSuccess = (data) => {
    return { type: 'EDIT_REKENING_WITH_DATA_SUCCESS', data};
};

const editRekeningSuccess = () => {
    return { type: 'EDIT_REKENING_SUCCESS' };
};

const editRekeningFailed = () => {
    return { type: 'EDIT_REKENING_FAILED' };
};

export const forceResetER = () => {
    return { type: 'RESET_EDIT_REKENING_STATE' };
};

const InternalServerError = () => {
    return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherEditRekening(data) {
    yield takeEvery('EDIT_REKENING', workerEditRekening);
};

function* workerEditRekening(form) {
    try {
        var response = yield call(() => {
            return request
            .post(`${SERVER_URL}profile/android/edit-rekening`)
            .set('Authorization', form.data.token)
            .send({naRek: form.data.naRek})
            .send({noRek: form.data.noRek})
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        if (data.success) {
            yield put(editRekeningWithDataSuccess(data.data));
            yield put(editRekeningSuccess())
        }else{
            yield put(editRekeningFailed())
        }
    }catch (error) {
        yield put(InternalServerError());
    }
}
