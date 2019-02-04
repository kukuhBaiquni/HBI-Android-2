let initialState = {};

export default function customContent(state = initialState, action) {
  switch (action.type) {

    case 'SHARE_TO_CUSTOM_CONTENT':
    const looper = action.data.reduce((o, key) => ({ ...o, [key]: []}), {})
    return looper

    default:
    return state;
  }
}
