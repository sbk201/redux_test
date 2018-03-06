import { combineReducers } from 'redux';
import {merge,cloneDeep as clone,flow} from "lodash";
const mergeClone=(...arg)=>merge(...arg.map(clone));
const main = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_SBUS':
    	return mergeClone(state,{sbus:action.sbus})
      // return Object.assign({},clone(state),{sbus:action.sbus})
    case 'RECEIVE_COUNTRIES':
      return mergeClone(state,{countries:action.countries})
    case 'PICKED_SBU':
      return mergeClone(state,{pickedSbu:action.sbu})
    case 'PICKED_COUNTRY':
      return mergeClone(state,{pickedCountry:action.country})
    case 'ADD_TODOS':
      return [...state,action.todos]
    case 'REMOVE_TODOS':
      return state.slice().filter(ele=>ele._id!==action._id)
    default:
      return state
  }
}

const localUI = (state = {}, action) => {
	switch (action.type) {
	case "UPDATE_UI":
	const {type,contName,...other}=action;
	const stateMerge={[action.contName]:other}
	const newState=flow(mergeClone)(state,stateMerge);
	return newState
	default:
		return state;
	}
};

const customers = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CUSTOMERS':
      return action.Customers;
    default:
      return state
  }
}

const allReducers = combineReducers({
  localUI,
  main,
  customers
})

export default allReducers