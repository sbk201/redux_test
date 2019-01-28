import {mergeClone} from './init/global';
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
	{id:95 , url:"", title:"5", "preDay": 300, "preHour": 33.3, "totalHours": 9},
	{id:96 , url:"", title:"6", "preDay": 400, "preHour": 44.4, "totalHours": 9},
	{id:97 , url:"", title:"7", "preDay": 500, "preHour": 20, "totalHours": 9},
	{id:98 , url:"", title:"8", "preDay": 600, "preHour": 33.3, "totalHours": 9},
	{id:99 , url:"", title:"little rich", "preDay": 700, "preHour": 44.4, "totalHours": 8},
]
const jobs= (state = deJob, action) => {
  switch (action.type) {
  case "GET_JOBS":
  	return action.jobs;
  case "ADD_JOB":
  	const job=mergeClone(action.job, {url:"", title:""});
  	return [...state, job];
  case "UPDATE_JOB":
  	const id=action.job
  	return [...state,action.job];
  default:
    return state;
  }
};
const counter= (state = 0, action) => {
  switch (action.type) {
  case "ADD_COUNTER":
  	return state+1;
  default:
    return state;
  }
};

const allReducers = combineReducers({
  localUI, jobs, counter
})

export default allReducers