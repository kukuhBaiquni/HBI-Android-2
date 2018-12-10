let initialState = '';

export default function token(state = initialState, action) {
  switch (action.type) {

    case 'LOGIN_ATTEMPT_SUCCESS':
    return action.data;

    case 'RESET_TOKEN':
    return '';

    default:
    return state;
  }
}
