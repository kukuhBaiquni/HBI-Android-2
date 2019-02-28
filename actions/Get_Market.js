import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const getMarket = () => {
  return { type: 'GET_MARKET' };
};

const getMarketSuccess = (data) => {
  return { type: 'GET_MARKET_SUCCESS', data };
};

const getMarketFailed = () => {
  return { type: 'GET_MARKET_FAILED' };
};

export function* watcherGetMarket() {
  yield takeEvery('GET_MARKET', workerGetMarket);
};

function* workerGetMarket() {
  try {
    const fetch = yield call(() => {
      return request
      .get(`${SERVER_URL}android/get-list-market`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then((res) => {
        return res;
      })
    })
    const response = JSON.parse(fetch.xhr._response);
    if (response.success) {
      yield put(getMarketSuccess(response.data));
    }else{
      yield put(getMarketFailed())
    }
  }catch (error) {
    console.log(error);
    yield put(getMarketFailed());
  }
}
