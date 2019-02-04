let initialState = [];

export default function categoryContent(state = initialState, action) {
  switch (action.type) {

    case 'SHARE_TO_CUSTOM_CONTENT':
    return action.data;

    default:
    return state;
  }
}
