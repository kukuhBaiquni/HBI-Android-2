let initialState = [];

export default function transactionTypePending(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_TRANSACTION_TYPE_PENDING_SUCCESS':
    const reversing = [...action.data].reverse();
    return reversing;

    default:
    return state;
  }
}
