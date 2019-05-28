import { put, takeEvery } from 'redux-saga/effects';

export const setAddress = (data) => {
    return {
        type: 'SET_ADDRESS',
        data
    };
};

const setAddressToReducer = (data) => {
    return {
        type: 'SET_ADDRESS_TO_REDUCER',
        data
    };
};

export function* watcherSetAddress(data) {
    yield takeEvery('SET_ADDRESS', workerSetAddress);
};

function* workerSetAddress(form) {
    yield put(setAddressToReducer(form.data));
};
