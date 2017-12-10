const records = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECORD':
      return [...state,action.bool]
    default:
      return state
  }
}

export default records