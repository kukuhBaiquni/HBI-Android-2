let initialState = {
  loading: true,
  error: false
};

export default function global_status(state = initialState, action) {
  switch (action.type) {

    case 'GET_ALL_PRODUCTS':
    return { loading: true, error: false }

    case 'REQUEST_DONE':
    return { loading: false, error: false }

    case 'REQUEST_FAILED':
    return { loading: false, error: true }

    default:
    return { loading: false, error: false }
  }
}
