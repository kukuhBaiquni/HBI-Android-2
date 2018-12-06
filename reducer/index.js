import { combineReducers } from 'redux';
import listProducts from './List_Products';
import status from './Status';
import token from './Token';
import userData from './User_Data';
import resultCounting from './Result_Counting';

const rootReducer = combineReducers({
  listProducts, status, token, userData, resultCounting
})

export default rootReducer
