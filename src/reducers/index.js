import { combineReducers } from 'redux'
import todos from './todos'
import visibleFilter from './visibleFilter'

const todoApp = combineReducers({
  todos,
  visibleFilter,
})

export default todoApp