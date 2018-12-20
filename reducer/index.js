import { combineReducers } from 'redux';
import listProducts from './List_Products';
import status from './Status';
import token from './Token';
import userData from './User_Data';
import resultCounting from './Result_Counting';
import cart from './Cart';
import cartTotal from './Cart_Total';
import territorial from './Territorial';

const rootReducer = combineReducers({
  listProducts, status, token, userData, resultCounting, cart, cartTotal, territorial
});

export default rootReducer
