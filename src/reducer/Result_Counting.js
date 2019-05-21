let initialState = 0;

export default function resultCounting(state = initialState, action) {
  switch (action.type) {

    case 'COUNT_ITEM_SUCCESS':
    return action.data.result;

    default:
    return state;
  }
}
