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

export default function transactionAddress(state = initialState, action) {
  switch (action.type) {

    case 'SAVE_TRANSACTION_ADDRESS_SUCCESS':
    return action.data;

    default:
    return state;
  }
}
