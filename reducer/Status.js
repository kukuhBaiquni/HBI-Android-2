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
  isEmailFree: false,
  addToCart: {
    success: false,
    error: false
  },
  loadCart: {
    success: false,
    error: false
  },
  saveChanges: {
    success: false,
    error: false
  },
  checkPartial: {
    error: false
  },
  checkAll: {
    error: false
  },
  removeItem: {
    success: false,
    error: false
  },
  saveAddress: {
    success: false,
    error: false
  },
  editProfile: {
    success: false,
    error: false
  },
  editRekening: {
    success: true,
    error: false
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

    case 'LOGIN_FAILED':
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

    case 'REGISTER_FAILED_PROTOTYPE':
    return Object.assign({}, state, {
      register: {
        ...state.register, success: false, error: true, message: 'Email sudah digunakan'
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

    case 'EMAIL_FREE':
    return Object.assign({}, state, {
      isEmailFree: true
    });

    case 'RESET_CHECK_EMAIL_STATE':
    return Object.assign({}, state, {
      isEmailFree: false
    });

    case 'ADD_TO_CART_SUCCESS':
    return Object.assign({}, state, {
      addToCart: {
        ...state.addToCart, success: true, error: false
      }
    });

    case 'ADD_TO_CART_FAILED':
    return Object.assign({}, state, {
      addToCart: {
        ...state.addToCart, success: false, error: true
      }
    });

    case 'RESET_ATC_STATE':
    return Object.assign({}, state, {
      addToCart: {
        ...state.addToCart, success: false, error: false
      }
    });

    case 'LOAD_CART_SUCCESS':
    return Object.assign({}, state, {
      loadCart: {
        ...state.loadCart, success: true, error: false
      }
    });

    case 'LOAD_CART_FAILED':
    return Object.assign({}, state, {
      loadCart: {
        ...state.loadCart, success: false, error: true
      }
    });

    case 'RESET_LOAD_CART_STATE':
    return Object.assign({}, state, {
      loadCart: {
        ...state.loadCart, success: false, error: false
      }
    });

    case 'SAVE_CHANGES_SUCCESS':
    return Object.assign({}, state, {
      saveChanges: {
        ...state.saveChanges, success: true, error: false
      }
    });

    case 'SAVE_CHANGES_FAILED':
    return Object.assign({}, state, {
      saveChanges: {
        ...state.saveChanges, success: false, error: true
      }
    });

    case 'RESET_SAVE_CHANGES_STATE':
    return Object.assign({}, state, {
      saveChanges: {
        ...state.saveChanges, success: false, error: false
      }
    });

    case 'CART_CHECK_PARTIAL_FAILED':
    return Object.assign({}, state, {
      checkPartial: {
        ...state.checkPartial, error: true
      }
    });

    case 'RESET_CHECK_PARTIAL_STATE':
    return Object.assign({}, state, {
      checkPartial: {
        ...state.checkPartial, error: false
      }
    });

    case 'CART_CHECK_ALL_FAILED':
    return Object.assign({}, state, {
      checkAll: {
        ...state.checkAll, error: true
      }
    });

    case 'RESET_CHECK_ALL_STATE':
    return Object.assign({}, state, {
      checkAll: {
        ...state.checkAll, error: false
      }
    });

    case 'REMOVE_ITEM_SUCCESS':
    return Object.assign({}, state, {
      removeItem: {
        ...state.removeItem, success: true, error: false
      }
    });

    case 'REMOVE_ITEM_FAILED':
    return Object.assign({}, state, {
      removeItem: {
        ...state.removeItem, success: false, error: true
      }
    });

    case 'RESET_REMOVE_ITEM_STATE':
    return Object.assign({}, state, {
      removeItem: {
        ...state.removeItem, success: false, error: false
      }
    });

    case 'SAVE_ADDRESS_SUCCESS':
    return Object.assign({}, state, {
      saveAddress: {
        ...state.saveAddress, success: true, error: false
      }
    });

    case 'SAVE_ADDRESS_FAILED':
    return Object.assign({}, state, {
      saveAddress: {
        ...state.saveAddress, success: false, error: true
      }
    });

    case 'RESET_SAVE_ADDRESS_STATE':
    return Object.assign({}, state, {
      saveAddress: {
        ...state.saveAddress, success: false, error: false
      }
    });

    case 'EDIT_PROFILE_SUCCESS':
    return Object.assign({}, state, {
      editProfile: {
        ...state.editProfile, success: true, error: false
      }
    });

    case 'EDIT_PROFILE_FAILED':
    return Object.assign({}, state, {
      editProfile: {
        ...state.editProfile, success: false, error: true
      }
    });

    case 'RESET_EDIT_PROFILE_STATE':
    return Object.assign({}, state, {
      editProfile: {
        ...state.editProfile, success: false, error: false
      }
    });

    case 'EDIT_REKENING_SUCCESS':
    return Object.assign({}, state, {
      editRekening: {
        ...state.editRekening, success: true, error: false
      }
    });

    case 'EDIT_REKENING_FAILED':
    return Object.assign({}, state, {
      editRekening: {
        ...state.editRekening, success: false, error: true
      }
    });

    case 'RESET_EDIT_REKENING_STATE':
    return Object.assign({}, state, {
      editRekening: {
        ...state.editRekening, success: false, error: false
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
