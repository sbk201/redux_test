import { combineReducers } from 'redux'
// import todos from './todos'
// import visibleFilter from './visibleFilter'
import apidata from './apidata'
import localUI from './localUI'

const todoApp = combineReducers({
  localUI,
  apidata,
})

export default todoApp