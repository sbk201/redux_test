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

const formInputs= (state = [], action) => {
  switch (action.type) {
  case "SET_INPUTS":
  return action.inputs
  case "INSERT_INPUTS":
  // const {inputs}=action;
  // console.log('runs2')
  // const existed=state.some(ele=>ele.id===inputs.id);
  // console.log(existed,inputs);
  // console.log(existed ? state.map(ele=>ele.id===inputs.id && inputs) : state.concat(inputs) )
  // return existed ? state.map(ele=>ele.id===inputs.id && inputs) : state.concat(inputs) ;
  return state
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

const todos= (state = [], action) => {
  switch (action.type) {
  case "GET_TODOS":
  return action.todos;
  default:
    return state;
  }
};

const allReducers = combineReducers({
  localUI,formInputs,todos,userInfo
})

export default allReducers