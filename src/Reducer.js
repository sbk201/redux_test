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

const offices = (state = [], action) => {
  switch (action.type) {
    case 'GET_OFFICES':
      return action.offices;
    default:
      return state
  }
}

const allReducers = combineReducers({
  localUI,offices
})

export default allReducers