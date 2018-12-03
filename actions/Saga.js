import { all } from 'redux-saga/effects';
import { watcherLoginAttempt } from './Login_Attempt';
import { watcherGetAllProducts } from './Get_All_Products';
import { watcherFecthUserData } from './Get_User_Data';

export default function* rootSaga() {
  yield all([
    watcherGetAllProducts(),
    watcherLoginAttempt(),
    watcherFecthUserData()
  ]);
};
