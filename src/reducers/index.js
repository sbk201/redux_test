import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import number from './number'
import records from './records'
import question from './question'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  number,
  records,
  question,
})

export default todoApp