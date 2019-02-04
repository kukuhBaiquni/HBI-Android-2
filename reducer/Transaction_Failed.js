let initialState = [];

export default function transactionTypeFailed(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_TRANSACTION_TYPE_FAILED_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
