import { combineReducers } from 'redux';
import listProducts from './List_Products';
import globalStatus from './Global_Status';
import activeUser from './Active_User';

const rootReducer = combineReducers({
  listProducts, globalStatus, activeUser
})

export default rootReducer
