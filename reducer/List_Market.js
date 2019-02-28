let initialState = {
  status: {
    error: false,
    success: false
  },
  data: []
};

export default function listMarket(state = initialState, action) {
  switch (action.type) {

    case 'GET_MARKET_SUCCESS':
    return Object.assign({}, state, {
      status: {
        success: true, error: false
      },
      data: action.data
    });

    case 'GET_MARKET_FAILED':
    return Object.assign({}, state, {
      status: {
        success: false, error: true
      }
    });

    case 'RESET_GET_MARKET_STATE':
    return Object.assign({}, state, {
      status: {
        success: false, error: false
      }
    });

    default:
    return state;
  }
}
