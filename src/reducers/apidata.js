const apidata = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.json
    default:
      return state
  }
}

export default apidata