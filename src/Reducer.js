import {mergeClone} from './init/global'
import { combineReducers } from 'redux';

const message= (state = [], action) => {
  switch (action.type) {
  case "ADD_MESSAGE":
    const {type,...rest}=action;
    // console.log([...state,rest]);
  // return state
  return [...state,rest]
  case "GET_MESSAGE":
  case "RECEIVE_MESSAGE":
  return action.message
  case "DELETE_MESSAGE":
  const exclude=ele=>ele._id!==action._id;
  return state.filter(exclude);
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
  localUI,message
})

export default allReducers