let initialState = [];

export default function activeUser(state = initialState, action) {
  switch (action.type) {

    case 'GET_USER_SUCCESS':
    return [];

    default:
    return state;
  }
}
