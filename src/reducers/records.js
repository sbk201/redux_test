const records = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECORD':
    const {time,question}=action;
      return [...state,{time,question}]
    default:
      return state
  }
}

export default records