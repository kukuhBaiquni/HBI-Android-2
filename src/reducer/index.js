import { combineReducers } from 'redux';
import listProducts from './List_Products';
import status from './Status';
import token from './Token';
import userData from './User_Data';
import resultCounting from './Result_Counting';
import cart from './Cart';
import territorial from './Territorial';
import transaction from './Transaction';
import bank from './Bank';
import transactionRecords from './Transaction_Records';
import ongkir from './Ongkir';
import categoryContent from './Category_Content';
import transactionTypePending from './Transaction_Pending';
import transactionTypeFailed from './Transaction_Failed';
import transactionTypeExpired from './Transaction_Expired';
import transactionTypeSuccess from './Transaction_Success';
import customContent from './Custom_Content';
import badge from './Badge';
import listMarket from './List_Market';
import targetMember from './Target_Member';
import forgetPassword from './Forget_Password_Status';
import addressHandler from './Address_Handler';
import singleTransaction from './SingleTransaction';

const rootReducer = combineReducers({
    listProducts,
    status,
    token,
    userData,
    resultCounting,
    cart,
    territorial,
    transaction,
    bank,
    transactionRecords,
    ongkir,
    categoryContent,
    transactionTypePending,
    transactionTypeFailed,
    transactionTypeExpired,
    transactionTypeSuccess,
    customContent,
    badge,
    listMarket,
    targetMember,
    forgetPassword,
    addressHandler,
    singleTransaction
});

export default rootReducer
