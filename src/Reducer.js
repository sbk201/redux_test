import {mergeClone} from './init/global'
import { combineReducers } from 'redux';

const userProfile = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_USER_PROFILE':
      return action.userProfile
    default:
      return state
  }
}
const messages = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_MESSAGES':
    	return action.messages
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
  localUI,userProfile,messages
})

export default allReducers