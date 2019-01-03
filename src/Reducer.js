import {mergeClone} from './init/global'
import { combineReducers } from 'redux';

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

const news= (state = [], action) => {
  switch (action.type) {
  case "GET_NEWS":
  return action.news;
  default:
    return state;
  }
};

const allReducers = combineReducers({
  localUI,news
})

export default allReducers