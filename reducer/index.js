import { combineReducers } from 'redux';
import listProducts from './List_Products';
import status from './Status';
import token from './Token';
import userData from './User_Data';
import resultCounting from './Result_Counting';
import cart from './Cart';
import cartTotal from './Cart_Total';
import territorial from './Territorial';
import transaction from './Transaction';

const rootReducer = combineReducers({
  listProducts, status, token, userData, resultCounting, cart, cartTotal, territorial, transaction
});

export default rootReducer
