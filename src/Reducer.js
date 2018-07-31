import {mergeClone} from './init/global'
import { combineReducers } from 'redux';

const ideas= (state = [], action) => {
  switch (action.type) {
  case "GET_IDEAS":
  console.log(action.ideas);
  return action.ideas
  default:
    return state;
  }
};

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
  localUI,ideas
})

export default allReducers