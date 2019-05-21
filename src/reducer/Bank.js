let initialState = [];

export default function bank(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_BANK_WITH_DATA_SUCCESS':
    return action.data;

    case 'RESET_LOAD_BANK_STATE':
    return []

    default:
    return state;
  }
}
