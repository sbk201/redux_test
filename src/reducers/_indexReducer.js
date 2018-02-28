import { combineReducers } from 'redux';
import main from './main';
import localUI from './localUI';
import customers from './customers';

const _allReducers = combineReducers({
  localUI,
  main,
  customers
})

export default _allReducers