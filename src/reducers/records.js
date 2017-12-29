const records = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RECORD':
    // const {time,question}=action;
    const {time:time_,question}=action;
    const time=~~time_;
    // const t1=~~time
    // console.log(time,t1)
      return [...state,{time,question}]
    default:
      return state
  }
}

export default records