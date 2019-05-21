let initialState = false;

export default function transaction(state = initialState, action) {
    switch (action.type) {

        case 'INITIALIZATION_OK':
        return true

        default:
        return state;
    }
};
