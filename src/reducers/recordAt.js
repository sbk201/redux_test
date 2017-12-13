const recordAt = (state = 0, action) => {
  switch (action.type) {
    case 'RECORD_AT':
      return action.time
    default:
      return state
  }
}

export default recordAt