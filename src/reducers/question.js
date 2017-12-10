const question = (state = {ask:'',answer:''}, action) => {
  switch (action.type) {
    case 'NEW_QUESTION':
      return action.question
    default:
      return state
  }
}

export default question