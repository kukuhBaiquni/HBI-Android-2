let initialState = {
  login: {
    error: false,
    message: ''
  },
  register: {
    error: false,
    message: ''
  },
  InternalServerError: false
};

export default function status(state = initialState, action) {
  switch (action.type) {

    case 'LOGIN_SUCCESS':
    return Object.assign({}, state, {
      login: {
        ...state.login, error: false, message: ''
      },
      InternalServerError: false
    });

    case 'LOGIN_ERROR':
    return Object.assign({}, state, {
      login: {
        ...state.login, error: true, message: action.message
      }
    });

    case 'INTERNAL_SERVER_ERROR':
    return Object.assign({}, state, {
      InternalServerError: true
    })

    default:
    return state
  }
}
