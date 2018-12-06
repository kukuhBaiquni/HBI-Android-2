let initialState = {
  login: {
    error: false,
    message: ''
  },
  register: {
    success: false,
    error: false,
    message: ''
  },
  account_verification: {
    success: false,
    error: false,
    message: '',
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

    case 'RESET_LOGIN_STATE':
    return Object.assign({}, state, {
      login: {
        ...state.login, error: false, message: ''
      }
    });

    case 'REGISTER_SUCCESS':
    return Object.assign({}, state, {
      register: {
        ...state.register, success: true, error: false, message: action.message.success
      }
    })

    case 'REGISTER_FAILED':
    return Object.assign({}, state, {
      register: {
        ...state.register, success: false, error: true, message: action.message.failure
      }
    });

    case 'RESET_REGISTER_STATE':
    return Object.assign({}, state, {
      register: {
        ...state.register, success: false, error: false, message: ''
      }
    });

    case 'ACCOUNT_VERIFICATION_SUCCESS':
    return Object.assign({}, state, {
      account_verification: {
        ...state.account_verification, success: true, error: false, message: action.message
      }
    });

    case 'ACCOUNT_VERIFICATION_FAILED':
    return Object.assign({}, state, {
      account_verification: {
        ...state.account_verification, success: false, error: true, message: action.message
      }
    });

    case 'RESET_ACCOUNT_VERIFICATION_STATE':
    return Object.assign({}, state, {
      account_verification: {
        ...state.account_verification, success: false, error: false, message: ''
      }
    });

    case 'INTERNAL_SERVER_ERROR':
    return Object.assign({}, state, {
      InternalServerError: true
    });

    default:
    return state;
  }
}
