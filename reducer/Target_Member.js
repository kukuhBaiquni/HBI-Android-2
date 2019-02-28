let initialState = {
  id: '',
  name: '',
  email: '',
  phone: null,
  address: {
    street: '',
    no: null,
    rt: null,
    rw: null,
    city: '',
    district: '',
    village: ''
  },
  stock: [],
  isOpen: false,
  playerID: '',
}

export default function targetMember(state = initialState, action) {
  switch (action.type) {

    case 'SET_TARGET_MEMBER_SUCCESS':
    return action.data

    default:
    return state;
  }
}
