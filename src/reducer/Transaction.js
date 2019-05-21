let initialState = {};

export default function transaction(state = initialState, action) {
  switch (action.type) {

    case 'TRANSACTION_DATA':
    return action.data;

    case 'LOAD_SINGLE_TRANSACTION_SUCCESS':
    return action.data;

    default:
    return state;
  }
}