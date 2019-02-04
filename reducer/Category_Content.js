let initialState = [];

export default function categoryContent(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CATEGORY_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
