import { combineReducers } from 'redux';
import data from './data';
import global_status from './global_status';

const rootReducer = combineReducers({
  data, global_status
})

export default rootReducer
