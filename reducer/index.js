import { combineReducers } from 'redux';
import listProducts from './List_Products';
import globalStatus from './Global_Status';

const rootReducer = combineReducers({
  listProducts, globalStatus
})

export default rootReducer
