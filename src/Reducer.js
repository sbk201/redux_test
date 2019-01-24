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
const deJob=[
	{"preDay": 300, "preHour": 33.3, "totalHours": 9 },
	{"preDay": 400, "preHour": 44.4, "totalHours": 9 },
]
const jobs= (state = deJob, action) => {
  switch (action.type) {
  case "GET_JOBS":
  	return action.jobs;
  case "ADD_JOB":
  	return [...state,action.job];
  default:
    return state;
  }
};

const allReducers = combineReducers({
  localUI,jobs
})

export default allReducers