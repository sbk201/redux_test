import {mergeClone} from './init/global'
import { combineReducers } from 'redux';


const pageView = (state = "search", action) => {
  switch (action.type) {
    case 'NEXT_VIEW':
    	return action.view;
    default:
      return state;
  }
}

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
	const newState=mergeClone(state,stateMerge);
	return newState
	default:
		return state;
	}
};

const customers = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_CUSTOMERS':
      return action.customers;
    case 'SELECT_CUST':
    	const id=action.globalCustNbr;
    	const toggleCust=ele=>{
    		const isTarget= ele.globalCustNbr===id;
    		const newStatus=!ele.selected;
    		if(isTarget) return mergeClone(ele,{selected:newStatus});
			return ele
    	}
    	const newState=state.map(toggleCust);
      return newState
    default:
      return state
  }
}

const contact = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_CONTACT':
      return action.contact;
    default:
      return state
  }
}

const employee = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_EMPLOYEE':
      return action.employee;
    case 'SELECT_EMP':
      const id=action.GlobalEmpNbr;
      const toggleEmp=ele=>{
        const isTarget= ele.GlobalEmpNbr===id;
        const newStatus=!ele.selected;
        if(isTarget) return mergeClone(ele,{selected:newStatus});
      return ele
      }
      const newState=state.map(toggleEmp);
      return newState
    default:
      return state
  }
}

const allReducers = combineReducers({
  localUI,pageView, main, contact, customers,employee
})

export default allReducers