import {mergeClone} from './init/global'
import { combineReducers } from 'redux';
import {pick} from 'lodash';

const userInfo = (state = null, action) => {
  switch (action.type) {
    case 'SIGN_OUT':
    return {logged:false}
    case 'RECEIVE_USER_INFO':
      const list=["uid","email","username","logged"]
      return pick(action.userInfo,list)
    default:
      return state
  }
}

const users = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_ALL_USERS':
    console.log(action.users)
      return action.users;
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
  localUI,userInfo,messages,users
})

export default allReducers