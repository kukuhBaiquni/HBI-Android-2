let initialState = {
  cities: [],
  districts: [],
  villages: []
};

export default function territorial(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_CITIES_SUCCESS':
    return Object.assign({}, state, {
      cities: action.data
    });

    case 'LOAD_DISTRICTS_SUCCESS':
    return Object.assign({}, state, {
      districts: action.data
    });

    case 'LOAD_VILLAGES_SUCCESS':
    return Object.assign({}, state, {
      villages: action.data
    });

    case 'RESET_PARTIAL_TERRITORIAL':
    return Object.assign({}, state, {
      city: [], districts: [], villages: []
    });

    default:
    return state;
  }
}
