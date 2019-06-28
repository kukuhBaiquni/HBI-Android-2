let initialState = {
    success: false,
    error: false,
    data: {}
};

export default function transaction(state = initialState, action) {
  switch (action.type) {

    case 'TRANSACTION_DATA':
    return Object.assign({}, state, {
        success: true,
        error: false,
        data: action.data
    });

    case 'RESET_TRANSACTION_DATA_STATE':
    return Object.assign({}, state, {
        success: false,
        error: false
    });

    case 'LOAD_SINGLE_TRANSACTION_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
