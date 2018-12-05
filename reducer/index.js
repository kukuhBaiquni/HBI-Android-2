import { combineReducers } from 'redux';
import listProducts from './List_Products';
import status from './Status';
import token from './Token';
import userData from './User_Data';

const rootReducer = combineReducers({
  listProducts, status, token, userData
})

export default rootReducer
