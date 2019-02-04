let initialState = {
  success: false,
  error: false,
  data: [],
  isProcessing: false
};

export default function categoryContent(state = initialState, action) {
  switch (action.type) {

    case 'START_PROCESS_LOAD_CATEGORY':
    return Object.assign({}, state, {
      isProcessing: true
    })

    case 'LOAD_CATEGORY_SUCCESS':
    return Object.assign({}, state, {
      data: [...action.data], success: true, error: false, isProcessing: false
    })

    case 'LOAD_CATEGORY_FAILED':
    return Object.assign({}, state, {
      data: [...state.data], success: false, error: true, isProcessing: false
    })

    default:
    return state;
  }
}
