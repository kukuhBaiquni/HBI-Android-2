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
import { watcherSaveChanges } from './Save_Changes';
import { watcherCartCheckPartial } from './Cart_Check_Partial';
import { watcherCartCheckAll } from './Cart_Check_All';
import { watcherRemoveItem } from './Remove_Item';
import { watcherLoadCities } from './Load_Cities';
import { watcherLoadDistricts } from './Load_Districts';
import { watcherLoadVillages } from './Load_Villages';
import { watcherSaveAddress } from './Save_Address';
import { watcherConfirmTransaction } from './Confirm_Transaction';
import { watcherDirectPurchase } from './Direct_Purchase';
import { watcherLoadBank } from './Load_Bank';
import { watcherEditProfile } from './Edit_Profile';
import { watcherEditRekening } from './Edit_Rekening';
import { watcherLoadTransaction } from './Load_Transaction';
import { watcherCheckOngkir } from './Check_Ongkir';
import { watcherLoadCategory } from './Load_Category';
import { watcherLoadTransactionTypePending } from './Load_Transaction_Type_Pending';
import { watcherLoadTransactionTypeExpired } from './Load_Transaction_Type_Expired';
import { watcherLoadTransactionTypeSuccess } from './Load_Transaction_Type_Success';
import { watcherLoadTransactionTypeFailed } from './Load_Transaction_Type_Failed';
import { watcherResetPassword } from './Reset_Password';
import { watcherLoadCustomContent } from './Load_Custom_Content';
import { watcherLoadListContent } from './Load_List_Content';
import { watcherSetPlayerId } from './Set_Player_Id';
import { watcherFetchNotifications } from './Fetch_Notifications';
import { watcherSetInitialToken } from './Set_Initial_Token';
import { watcherReadingNotification } from './Reading_Notification';
import { watcherLoadBadge } from './Load_Badge';
import { watcherSendForm } from './Send_Call_Us';
import { watcherLoadSingleTransaction } from './Load_Single_Transaction';
import { watcherSetTargetMember } from './Set_Target_Member';
import { watcherGetMemberLocation } from './Get_Member_Location';
import { watcherSendEmail } from './Forget_Password_Send_Email';
import { watcherChangePassword } from './Change_Password';
import { watcherSingleTransaction } from './SingleTransaction';

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
        watcherLoadCart(),
        watcherSaveChanges(),
        watcherCartCheckPartial(),
        watcherCartCheckAll(),
        watcherRemoveItem(),
        watcherLoadCities(),
        watcherLoadDistricts(),
        watcherLoadVillages(),
        watcherSaveAddress(),
        watcherConfirmTransaction(),
        watcherDirectPurchase(),
        watcherLoadBank(),
        watcherEditProfile(),
        watcherEditRekening(),
        watcherLoadTransaction(),
        watcherCheckOngkir(),
        watcherLoadCategory(),
        watcherLoadTransactionTypePending(),
        watcherLoadTransactionTypeExpired(),
        watcherLoadTransactionTypeSuccess(),
        watcherLoadTransactionTypeFailed(),
        watcherResetPassword(),
        watcherLoadCustomContent(),
        watcherLoadListContent(),
        watcherSetPlayerId(),
        watcherFetchNotifications(),
        watcherSetInitialToken(),
        watcherReadingNotification(),
        watcherLoadBadge(),
        watcherSendForm(),
        watcherLoadSingleTransaction(),
        watcherSetTargetMember(),
        watcherGetMemberLocation(),
        watcherSendEmail(),
        watcherChangePassword(),
        watcherSingleTransaction()
    ]);
};
