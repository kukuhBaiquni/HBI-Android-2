let initialState = [];

export default function transactionRecords(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_TRANSACTION_WITH_DATA_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
