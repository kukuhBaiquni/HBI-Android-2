import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const saveChanges = (data) => {
  return { type: 'SAVE_CHANGES', data };
};

const saveChangesSuccess = () => {
  return { type: 'SAVE_CHANGES_SUCCESS' };
};

const saveChangesFailed = () => {
  return { type: 'SAVE_CHANGES_FAILED' };
};

const saveChangesWithDataSuccess = (data) => {
  return { type: 'SAVE_CHANGES_WITH_DATA_SUCCESS', data };
};

const cartTotal = (data) => {
  return { type: 'CART_TOTAL', data };
};

export const forceResetSC = () => {
  return { type: 'RESET_SAVE_CHANGES_STATE' };
};

const InternalServerError = () => {
  return { type: 'INTERNAL_SERVER_ERROR' };
};

export function* watcherSaveChanges(data) {
  yield takeEvery('SAVE_CHANGES', workerSaveChanges);
};

function* workerSaveChanges(form) {
  try {
    var response = yield call(() => {
      return request
      .post(`${SERVER_URL}android/save-changes`)
      .send({token: form.data.token})
      .send({id: form.data.id})
      .send({_id: form.data._id})
      .send({qty: form.data.qty})
      .send({selected_process: form.data.selected_process})
      .then((res) => {
        return res;
      })
    })
    var raw = JSON.parse(response.xhr._response);
    var data = raw;
    if (data.success) {
      var total = 0;
      data.data.forEach(x => total += x.subtotal)
      yield put(saveChangesSuccess());
      yield put(saveChangesWithDataSuccess(data.data))
      yield put(cartTotal(total))
    }else{
      yield put(saveChangesFailed())
    }
  }catch (error) {
    yield put(InternalServerError());
  }
}
