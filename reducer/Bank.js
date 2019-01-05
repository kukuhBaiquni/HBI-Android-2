let initialState = [];

export default function bank(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_BANK_WITH_DATA_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
