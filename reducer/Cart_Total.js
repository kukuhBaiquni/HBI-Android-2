let initialState = 0;

export default function cartTotal(state = initialState, action) {
  switch (action.type) {

    case 'CART_TOTAL':
    return action.data;

    default:
    return state;
  }
}
