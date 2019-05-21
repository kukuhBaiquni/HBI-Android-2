let initialState = {
    sendEmail: {
        success: false,
        error: false,
        email: '',
        statusCode: null
    },
    changePassword: {
        success: false,
        error: false,
        statusCode: null
    }
};

export default function forgetPassword(state = initialState, action) {
    switch (action.type) {

        case 'SEND_EMAIL_SUCCESS':
        return Object.assign({}, state, {
            sendEmail: {
                ...state.sendEmail,
                success: true,
                error: false,
                email: action.data,
                statusCode: null
            }
        });

        case 'SEND_EMAIL_FAILED':
        return Object.assign({}, state, {
            sendEmail: {
                ...state.sendEmail,
                success: false,
                error: true,
                statusCode: action.statusCode
            }
        });

        case 'RESET_SEND_EMAIL_STATE':
        return Object.assign({}, state, {
            sendEmail: {
                ...state.sendEmail,
                success: false,
                error: false,
                statusCode: null,
                email: ''
            }
        });

        case 'CHANGE_PASSWORD_SUCCESS':
        return Object.assign({}, state, {
            changePassword: {
                ...state.changePassword,
                success: true,
                error: false,
                statusCode: null
            }
        });

        case 'CHANGE_PASSWORD_FAILED':
        return Object.assign({}, state, {
            changePassword: {
                ...state.changePassword,
                success: false,
                error: true,
                statusCode: action.statusCode
            }
        });

        case 'RESET_CHANGE_PASSWORD_STATE':
        return Object.assign({}, state, {
            changePassword: {
                ...state.changePassword,
                success: false,
                error: false,
                statusCode: null
            }
        });

        default:
        return state;
    }
}
