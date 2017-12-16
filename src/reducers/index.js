import { combineReducers } from 'redux'
import question from './question'
import records from './records'

const todoApp = combineReducers({
  question,
  records,
})

export default todoApp