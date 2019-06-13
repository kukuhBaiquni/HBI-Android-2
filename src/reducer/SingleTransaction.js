let initialState = {};

export default function singleTransaction(state = initialState, action) {
    switch (action.type) {

        case 'SAVE_SINGLE_TRANSACTION':
        return action.data;

        case 'RESET_SINGLE_TRANSACTION':
        return {}

        default:
        return state;
    }
};
