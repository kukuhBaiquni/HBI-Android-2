let initialState = [];

export default function transactionTypePending(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_TRANSACTION_TYPE_PENDING_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
