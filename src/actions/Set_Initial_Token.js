import { put, takeEvery } from 'redux-saga/effects';

export const setInitialToken = (data) => {
  return { type: 'SET_INITIAL_TOKEN', data };
};

const setTokenToReducer = (data) => {
  return { type: 'SET_TOKEN_TO_REDUCER', data };
};

export function* watcherSetInitialToken(data) {
  yield takeEvery('SET_INITIAL_TOKEN', workerSetInitialToken);
};

function* workerSetInitialToken(form) {
  yield put(setTokenToReducer(form.data));
};
