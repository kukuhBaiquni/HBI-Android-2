import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const editProfile = (data) => {
  return { type: 'EDIT_PROFILE', data };
};

const editProfileSuccess = () => {
  return { type: 'EDIT_PROFILE_SUCCESS' };
};

const editProfileWithDataSuccess = (data) => {
  return { type: 'EDIT_PROFILE_WITH_DATA_SUCCESS', data};
};

const editProfileFailed = () => {
  return { type: 'EDIT_PROFILE_FAILED' };
};

export const forceResetEP = () => {
  return { type: 'RESET_EDIT_PROFILE_STATE' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' }
};

export function* watcherEditProfile(data) {
  yield takeEvery('EDIT_PROFILE', workerEditProfile);
};

function* workerEditProfile(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}profile/android/edit-profile`)
      .send({token: form.data.token})
      .send({name: form.data.name})
      .send({phone: form.data.phone})
      .send({gender: form.data.gender})
      .send({city: form.data.city})
      .send({district: form.data.district})
      .send({village: form.data.village})
      .send({street: form.data.street})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      yield put(editProfileWithDataSuccess(data.data))
      yield put(editProfileSuccess());
    }else{
      yield put(editProfileFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
};
