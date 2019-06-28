let initialState = {
    success: false,
    error: false,
    data: [],
    total: 0,
};

export default function cart(state = initialState, action) {
  switch (action.type) {

    case 'ADD_TO_CART_SUCCESS':
    return Object.assign({}, state, {
        success: true,
        error: false,
        data: action.data.items,
        total: action.data.total
    });

    case 'ADD_TO_CART_FAILED':
    return Object.assign({}, state, {
        success: false,
        error: true
    });

    case 'LOAD_CART_SUCCESS':
    return Object.assign({}, state, {
        success: true,
        error: false,
        data: action.data.items,
        total: action.data.total
    });

    case 'LOAD_CART_FAILED':
    return Object.assign({}, state, {
        success: false,
        error: true
    });

    case 'SAVE_CHANGES_SUCCESS':
    return Object.assign({}, state, {
        success: true,
        error: false,
        data: action.data.items,
        total: action.data.total
    });

    case 'SAVE_CHANGES_FAILED':
    return Object.assign({}, state, {
        success: false,
        error: true
    });

    case 'REMOVE_ITEM_SUCCESS':
    return Object.assign({}, state, {
        success: true,
        error: false,
        data: action.data.items,
        total: action.data.total
    });

    case 'REMOVE_ITEM_FAILED':
    return Object.assign({}, state, {
        success: false,
        error: true
    });

    case 'RESET_CART_STATE':
    return Object.assign({}, state, {
        success: false,
        error: false
    });

    default:
    return state;
  }
}
