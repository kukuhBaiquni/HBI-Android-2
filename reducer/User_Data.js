let initialState = {};

export default function userData(state = initialState, action) {
  switch (action.type) {

    case 'FETCH_USER_SUCCESS':
    return action.data;

    default:
      return state;
  }
}
