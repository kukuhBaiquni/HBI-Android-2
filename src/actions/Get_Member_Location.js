import { put, call, takeEvery } from 'redux-saga/effects';
import request from 'superagent';
import { SERVER_URL } from '../components/basic/supportFunction';

export const getMemberLocation = () => {
    return { type: 'GET_MEMBER_LOCATION' }
};

const getMemberLocationSuccess = (data) => {
    return { type: 'GET_MEMBER_LOCATION_SUCCESS', data };
};

const getMemberLocationFailed = () => {
    return { type: 'GET_MEMBER_LOCATION_FAILED' };
};

export function* watcherGetMemberLocation() {
    yield takeEvery('GET_MEMBER_LOCATION', workerGetMemberLocation);
};

function* workerGetMemberLocation() {
    try {
        var response = yield call(() => {
            return request
            .get(`${SERVER_URL}reports/member/location`)
            .then((res) => {
                return res;
            })
        })
        var raw = JSON.parse(response.xhr._response);
        var data = raw;
        yield put(getMemberLocationSuccess(data.data));
    }catch (error) {
        yield put(getMemberLocationFailed());
    }
}
