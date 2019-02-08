let initialState = '';

export default function device(state = initialState, action) {
  switch (action.type) {

    case 'MY_PLAYER_ID':
    return action.data;

    default:
    return state;
  }
}
