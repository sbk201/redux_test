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
  {"id": 95, salary:5000, "url": "https://www.google.com/", "title": "little poor", "preDay": 300, "preHour": 33.3, "totalHours": 9 },
  {"id": 96, salary:6000, "url": "", "title": "better", "preDay": 400, "preHour": 44.4, "totalHours": 9 },
  {"id": 97, salary:7000, "url": "", "title": "poor", "preDay": 500, "preHour": 20, "totalHours": 9 },
  {"id": 98, salary:8000, "url": "", "title": "okay", "preDay": 600, "preHour": 33.3, "totalHours": 9 },
  {"id": 99, salary:9000, "url": "", "title": "little rich", "preDay": 700, "preHour": 44.4, "totalHours": 8 }
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