import { combineReducers } from 'redux'
import main from './main'
import apidata from './apidata'
import localUI from './localUI'

const _allReducers = combineReducers({
  localUI,
  apidata,
  main
})

export default _allReducers