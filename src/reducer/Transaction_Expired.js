let initialState = [];

export default function transactionTypeExpired(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_TRANSACTION_TYPE_EXPIRED_SUCCESS':
    const reversing = [...action.data].reverse();
    return reversing;


    default:
    return state;
  }
}
