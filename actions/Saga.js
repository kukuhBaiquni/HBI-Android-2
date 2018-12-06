import { all } from 'redux-saga/effects';
import { watcherLoginAttempt } from './Login_Attempt';
import { watcherGetAllProducts } from './Get_All_Products';
import { watcherFecthUserData } from './Get_User_Data';
import { watcherRegister } from './Register';
import { watcherCountItem } from './Counting_Items';
import { watcherAccountVerification } from './Account_Verification';

export default function* rootSaga() {
  yield all([
    watcherGetAllProducts(),
    watcherLoginAttempt(),
    watcherFecthUserData(),
    watcherRegister(),
    watcherCountItem(),
    watcherAccountVerification()
  ]);
};
