import { all } from 'redux-saga/effects';
import { watcherGetAllProducts } from './Get_All_Products';

export default function* rootSaga() {
  yield all([
    watcherGetAllProducts()
  ]);
};
