import { put, takeEvery } from 'redux-saga/effects';

export const setTargetMember = (data, ongkir) => {
  return { type: 'SET_TARGET_MEMBER', data, ongkir };
};

const setTargetMemberSuccess = (data, ongkir) => {
  return { type: 'SET_TARGET_MEMBER_SUCCESS', data, ongkir };
};

export function* watcherSetTargetMember(data, ongkir) {
  yield takeEvery('SET_TARGET_MEMBER', workerSetTargetMember);
};

function* workerSetTargetMember(form) {
  yield put(setTargetMemberSuccess(form.data, form.ongkir))
}
