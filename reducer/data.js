let initialState = [];

export default function data(state = initialState, action) {
  switch (action.type) {

    case 'GET_ALL_PRODUCTS_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
