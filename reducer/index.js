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

const rootReducer = combineReducers({
  listProducts, status, token, userData, resultCounting, cart, territorial, transaction, bank, transactionRecords, ongkir
});

export default rootReducer
