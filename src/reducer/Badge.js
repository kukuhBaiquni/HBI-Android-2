let initialState = 0;

export default function badge(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_BADGE_SUCCESS':
    return action.data;

    case 'APPLY_MODIFICATION':
    const type = action.data;
    let result = 0
    if (type === 'min') {
      if (state !== 0) {
        result = state - 1        
      }
    }else{
      result = state + 1
    }
    return result

    default:
    return state;
  }
}
