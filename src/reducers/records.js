const records = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECORD':
      return [...state,action.time]
    default:
      return state
  }
}

export default records