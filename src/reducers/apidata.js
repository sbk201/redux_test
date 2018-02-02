const apidata = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.todos
    case 'ADD_TODOS':
      return [...state,action.todos]
    case 'REMOVE_TODOS':
      // return state
      return state.slice().filter(ele=>ele._id!==action._id)
    default:
      return state
  }
}

export default apidata