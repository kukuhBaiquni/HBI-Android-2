import { combineReducers } from 'redux';
import listProducts from './List_Products';
import globalStatus from './Global_Status';
import token from './Token';
import userData from './User_Data';

const rootReducer = combineReducers({
  listProducts, globalStatus, token, userData
})

export default rootReducer
