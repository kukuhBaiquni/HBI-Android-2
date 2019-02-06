let initialState = {};

export default function customContent(state = initialState, action) {
  switch (action.type) {

    case 'SHARE_TO_CUSTOM_CONTENT':
    const looper = action.data.reduce((o, key) => ({ ...o, [key]: []}), {})
    return looper

    case 'LOAD_CUSTOM_CONTENT_SUCCESS':
    const key = action.data.type;
    return Object.assign({}, state, {
      [key]: [...action.data.data]
    });

    case 'LOAD_LIST_CONTENT_SUCCESS':
    const tag = action.data.type;
    return Object.assign({}, state, {
      [tag]: [...action.data.data]
    });

    default:
    return state;
  }
}
