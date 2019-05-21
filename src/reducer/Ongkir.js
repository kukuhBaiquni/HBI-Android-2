let initialState = 0;

export default function ongkir(state = initialState, action) {
  switch (action.type) {

    case 'ONGKIR_ACQUIRED':
    return action.data;

    case 'ONGKIR_FAILED':
    return 0

    default:
    return state;
  }
}
