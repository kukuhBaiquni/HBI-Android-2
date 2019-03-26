let initialState = {
  status: {
    error: false,
    success: false
  },
  data: []
};

export default function listMarket(state = initialState, action) {
  switch (action.type) {

    case 'GET_MEMBER_LOCATION_SUCCESS':
    return Object.assign({}, state, {
      status: {
        success: true, error: false
      },
      data: action.data
    });

    case 'GET_MEMBER_LOCATION_FAILED':
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
