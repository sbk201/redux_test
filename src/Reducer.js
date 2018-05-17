import {mergeClone} from './init/global'
import { combineReducers } from 'redux';

const sbus = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_SBUS':
      return action.sbus
    default:
      return state
  }
}
const reps = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_REPS':
      return action.reps
    default:
      return state
  }
}
const hospitals = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_HOSPITALS':
    	return action.hospitals
    default:
      return state
  }
}

const localUI = (state = {}, action) => {
	switch (action.type) {
	case "UPDATE_UI":
	const {type,contName,...other}=action;
	const stateMerge={[action.contName]:other}
	const newState=mergeClone(state,stateMerge);
	return newState
	default:
		return state;
	}
};

const allReducers = combineReducers({
  localUI,sbus, reps
})

export default allReducers