import {mergeClone} from './init/global';
import { combineReducers } from 'redux';
import {map} from 'ramda';

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
  {"id": 9997, salary:10000, "url": "https://hk.jobsdb.com/hk", "title": "Developer", "preDay": 300, "preHour": 100, "totalHours": 9 },
  {"id": 9998, salary:11000, "url": "https://www.ctgoodjobs.hk/", "title": "Casher", "preDay": 400, "preHour": 200, "totalHours": 9 },
  {"id": 9999, salary:12000, "url": "https://www.jobmarket.com.hk/", "title": "Sales", "preDay": 500, "preHour": 300, "totalHours": 9 },
]
const jobs= (state = deJob, action) => {
  switch (action.type) {
  case "GET_JOBS":
  	return action.jobs;
  case "ADD_JOB":
  	const job=mergeClone(action.job, {url:"", title:""});
  	return [...state, job];
  case "UPDATE_JOB":
  	const {id}=action.job
  	const mapFn= job=> job.id===id ? action.job : job;
  	const combine= map(mapFn);
  	return combine(state);
  case "DELETE_JOB":
  	return state.filter(job=> job.id!==action.id);
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