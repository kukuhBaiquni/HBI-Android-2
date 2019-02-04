let initialState = [];

export default function transactionTypeSuccess(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_TRANSACTION_TYPE_SUCCESS_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
