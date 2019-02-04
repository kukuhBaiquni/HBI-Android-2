let initialState = [];

export default function transactionTypeExpired(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_TRANSACTION_TYPE_EXPIRED_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
