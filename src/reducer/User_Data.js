let initialState = {
    data: {},
    success: false,
    error: {
        status: false,
        message: ''
    },
    updated: false
};

export default function userData(state = initialState, action) {
    switch (action.type) {

        case 'FETCH_USER_SUCCESS':
        return Object.assign({}, state, {
            success: true,
            data: action.data,
            error: {
                status: false,
                messsage: ''
            },
            updated: false
        });

        case 'FETCH_USER_FAILED':
        return Object.assign({}, state, {
            success: false,
            error: {
                status: true,
                message: action.message
            },
            updated: false
        });

        case 'EDIT_PROFILE_WITH_DATA_SUCCESS':
        return Object.assign({}, state, {
            data: action.data,
            updated: true,
            success: true,
            error: {
                status: false,
                messsage: ''
            },
        });

        case 'EDIT_REKENING_WITH_DATA_SUCCESS':
        return Object.assign({}, state, {
            data: {
                ...state.data,
                nama_rekening: action.data.nama_rekening,
                no_rekening: action.data.no_rekening
            },
            success: true,
            updated: true,
            error: {
                status: false,
                messsage: ''
            },
        });

        case 'EDIT_BANNER':
        return Object.assign({}, state, {
            data: {
                ...state.data,
                banner: action.data
            },
            success: true,
            updated: true,
            error: {
                status: false,
                messsage: ''
            },
        });

        case 'EDIT_PHOTO':
        return Object.assign({}, state, {
            data: {
                ...state.data,
                photo: action.data
            },
            success: true,
            updated: true,
            error: {
                status: false,
                messsage: ''
            },
        });

        case 'FETCH_NOTIFICATIONS_SUCCESS':
        const key = action.data.type;
        return Object.assign({}, state, {
            data: {
                ...state.data,
                notifications: {
                    ...state.data.notifications, [key]: [...action.data.data[key]]
                }
            },
            success: true,
            updated: true,
            error: {
                status: false,
                messsage: ''
            },
        });

        case 'READING_NOTIFICATION_SUCCESS':
        const type = action.data.type;
        return Object.assign({}, state, {
            data: {
                ...state.data,
                notifications: {
                    ...state.data.notifications, [type]: [...action.data.data[type]]
                }
            },
            success: true,
            updated: true,
            error: {
                status: false,
                messsage: ''
            },
        });

        case 'INCOMING_NOTIFICATIONS':
        return Object.assign({}, state, {
            data: {
                ...state.data,
                notifications: {
                    ...state.data.notifications, order: [action.data, ...state.data.notifications.order]
                }
            }
        });

        case 'LOGOUT_SUCCESS':
        return Object.assign({}, state, {
            data: {},
            success: false,
            error: {
                status: false,
                messsage: ''
            },
            updated: false
        });

        default:
        return state;
    }
}
