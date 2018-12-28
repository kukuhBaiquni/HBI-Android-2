let initialState = [];

export default function cart(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CART_WITH_DATA_SUCCESS':
    return action.data;

    case 'SAVE_CHANGES_WITH_DATA_SUCCESS':
    return action.data;

    case 'CART_CHECK_PARTIAL_SUCCESS':
    return action.data;

    case 'CART_CHECK_ALL_SUCCESS':
    return action.data;

    case 'REMOVE_ITEM_WITH_DATA_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
