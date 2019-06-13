import { put, takeEvery } from 'redux-saga/effects';

export const singleTransaction = (data) => {
    return {
        type: 'SINGLE_TRANSACTION',
        data
    };
};

const singleTransactionSuccess = () => {
    return {
        type: 'SAVE_SINGLE_TRANSACTION',
        data
    };
};

const resetSingleTransaction = () => {
    return {
        type: 'RESET_SINGLE_TRANSACTION'
    };
};

export function* watcherSingleTransaction(data) {
    yield takeEvery('SINGLE_TRANSACTION', workerSingleTransaction);
};

function* workerSingleTransaction(form) {
    yield put(singleTransactionSuccess(form.data));
};
