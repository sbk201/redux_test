import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import number from './number'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  number,
})

export default todoApp