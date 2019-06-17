let initialState = {
    data: [],
    success: false,
    error: false
};

export default function listProducts(state = initialState, action) {
    switch (action.type) {

        case 'GET_ALL_PRODUCTS_SUCCESS':
        return Object.assign({}, state, {
            data: action.data,
            success: true,
            error: false
        });

        case 'GET_ALL_PRODUCTS_FAILED':
        return Object.assign({}, state, {
            success: false,
            error: true
        });

        case 'RESET_GET_ALL_PRODUCTS_STATE':
        return Object.assign({}, state, {
            success: false,
            error: false
        });

        default:
        return state;
    }
};
