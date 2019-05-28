let initialState = {
    street: '',
    no: 0,
    rt: 0,
    rw: 0,
    province: '',
    city: '',
    district: '',
    village: '',
    geolocation: {
        latitude: 0,
        longitude: 0
    }
};

export default function addressHandler(state = initialState, action) {
    switch (action.type) {

        case 'SET_ADDRESS_TO_REDUCER':
        return action.data;

        default:
        return state;
    }
};
