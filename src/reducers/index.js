import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import question from './question'
import number from './number'
import records from './records'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  number,
  question,
  records,
})

export default todoApp