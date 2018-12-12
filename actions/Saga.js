import { all } from 'redux-saga/effects';
import { watcherLoginAttempt } from './Login_Attempt';
import { watcherGetAllProducts } from './Get_All_Products';
import { watcherFecthUserData } from './Get_User_Data';
import { watcherRegister } from './Register';
import { watcherCountItem } from './Counting_Items';
import { watcherAccountVerification } from './Account_Verification';
import { watcherFacebookRegister } from './Facebook_Register';
import { watcherCheckEmail } from './Check_Email';
import { watcherAddtoCart } from './Add_To_Cart';
import { watcherLoadCart } from './Load_Cart';

export default function* rootSaga() {
  yield all([
    watcherGetAllProducts(),
    watcherLoginAttempt(),
    watcherFecthUserData(),
    watcherRegister(),
    watcherCountItem(),
    watcherAccountVerification(),
    watcherFacebookRegister(),
    watcherCheckEmail(),
    watcherAddtoCart(),
    watcherLoadCart()
  ]);
};
