let initialState = {
  id: '',
  name: '',
  status: '',
  photo: '',
  gender: '',
  phone: 0,
  address: {
    city: '',
    district: '',
    village: '',
    street: ''
  },
  ongkir: 0,
  ttl: 0,
  join: '',
  email: '',
  nama_rekening: '',
  no_rekening: 0,
  banner: '',
  playerID: '',
  notifications: {
    order: [],
    system: [],
    inbox: []
  }
};

export default function userData(state = initialState, action) {
  switch (action.type) {

    case 'FETCH_USER_SUCCESS':
    return action.data;

    case 'EDIT_PROFILE_WITH_DATA_SUCCESS':
    return Object.assign({}, state, {
      name: action.data.name,
      gender: action.data.gender,
      phone: action.data.phone,
      address: {
        ...state.address,
        city: action.data.address.city,
        district: action.data.address.district,
        village: action.data.address.village,
        street: action.data.address.street
      },
      ttl: action.data.ttl,
      ongkir: action.data.ongkir
    });

    case 'EDIT_REKENING_WITH_DATA_SUCCESS':
    return Object.assign({}, state, {
      nama_rekening: action.data.nama_rekening,
      no_rekening: action.data.no_rekening
    });

    case 'EDIT_BANNER':
    return Object.assign({}, state, {
      banner: action.data
    });

    case 'EDIT_PHOTO':
    return Object.assign({}, state, {
      photo: action.data
    });

    case 'FETCH_NOTIFICATIONS_SUCCESS':
    const key = action.data.type;
    return Object.assign({}, state, {
      notifications: {
        ...state.notifications, [key]: [...action.data.data[key]]
      }
    });

    case 'READING_NOTIFICATION_SUCCESS':
    const type = action.data.type;
    return Object.assign({}, state, {
      notifications: {
        ...state.notifications, [type]: [...action.data.data[type]]
      }
    })

    case 'NEW_DATA':
    return Object.assign({}, state, {
      notifications: {
        ...state.notifications, order: [action.data, ...state.notifications.order]
      }
    })

    case 'LOGOUT_SUCCESS':
    return {
      id: '',
      name: '',
      status: '',
      photo: '',
      gender: '',
      phone: 0,
      address: {
        city: '',
        district: '',
        village: '',
        street: ''
      },
      ongkir: 0,
      ttl: 0,
      join: '',
      email: '',
      nama_rekening: '',
      no_rekening: 0,
      banner: '',
      playerID: '',
      notifications: {
        order: [],
        system: [],
        inbox: []
      }
    };

    default:
      return state;
  }
}
