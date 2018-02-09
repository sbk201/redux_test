import {cloneDeep as clone} from "lodash";
const _reducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_SBUS':
      return Object.assign({},clone(state),{sbus:action.sbus})
      // return assign(state,clone(action.sbus))
    case 'RECEIVE_COUNTRIES':
      return action.countries
    case 'ADD_TODOS':
      return [...state,action.todos]
    case 'REMOVE_TODOS':
      // return state
      return state.slice().filter(ele=>ele._id!==action._id)
    default:
      return state
  }
}

export default _reducer