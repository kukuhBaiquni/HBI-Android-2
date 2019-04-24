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
    ongkir: null
}

export default function targetMember(state = initialState, action) {
    switch (action.type) {

        case 'SET_TARGET_MEMBER_SUCCESS':
        console.log(action);
        return Object.assign({}, state, {
            ...action.data, ongkir: action.ongkir, id: action.data._id
        })

        default:
        return state;
    }
}
