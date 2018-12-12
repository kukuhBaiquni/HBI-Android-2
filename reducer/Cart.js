let initialState = [];

export default function cart(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CART_WITH_DATA_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
