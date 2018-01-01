import { combineReducers } from 'redux'
import todos from './todos'
import visibleFilter from './visibleFilter'
import localUI from './localUI'

const todoApp = combineReducers({
  todos,
  visibleFilter,
  localUI,
})

export default todoApp