import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../config';

export const getMemberLocation = (token) => {
    return { type: 'GET_MEMBER_LOCATION', token }
};

const getMemberLocationSuccess = (data) => {
    return { type: 'GET_MEMBER_LOCATION_SUCCESS', data };
};

const getMemberLocationFailed = () => {
    return { type: 'GET_MEMBER_LOCATION_FAILED' };
};

export function* watcherGetMemberLocation(token) {
    yield takeEvery('GET_MEMBER_LOCATION', workerGetMemberLocation);
};

function* workerGetMemberLocation(form) {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}non-member/get-member-location`)
            .set('Authorization', form.token)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        console.log('redddddddddddd',data);
        yield put(getMemberLocationSuccess(data.data));
    }catch (error) {
        yield put(getMemberLocationFailed());
    }
}
