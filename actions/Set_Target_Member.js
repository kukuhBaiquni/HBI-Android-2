import { put, takeEvery } from 'redux-saga/effects';

export const setTargetMember = (data) => {
  return { type: 'SET_TARGET_MEMBER', data };
};

const setTargetMemberSuccess = (data) => {
  return { type: 'SET_TARGET_MEMBER_SUCCESS', data };
};

export function* watcherSetTargetMember(data) {
  yield takeEvery('SET_TARGET_MEMBER', workerSetTargetMember);
};

function* workerSetTargetMember(form) {
  yield put(setTargetMemberSuccess(form.data))
}
