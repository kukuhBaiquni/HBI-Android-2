let initialState = {
    type: {
        access: '',
        refresh: '',
    },
    error: false,
    success: false
}

export default function token(state = initialState, action) {
    switch (action.type) {

        case 'LOGIN_ATTEMPT_FAILED':
        return Object.assign({}, state, {
            error: true,
            success: false
        });

        case 'SET_TOKEN_TO_REDUCER':
        return Object.assign({}, state, {
            type: {
                ...state.type,
                access: action.data.access,
                refresh: action.data.refresh
            },
            error: false,
            success: true
        });

        case 'RESET_TOKEN':
        return Object.assign({}, state, {
            type: {
                ...state.type,
                access: '',
                refresh: ''
            },
            error: false,
            success: false
        });

        case 'RESET_TOKEN_STATE':
        return Object.assign({}, state, {
            error: false,
            success: false
        });

        default:
        return state;
    }
}
