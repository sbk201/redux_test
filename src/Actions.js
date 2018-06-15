import axios from "axios";
// import {isTest,dummyData} from './init/global';

export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const selectReps=id=>({type: "SELECT_REP", id });
export const selectHosps=id=>({type: "SELECT_HOSPITALS", id });
const receiveSbus=sbus=>({type: "RECEIVE_SBUS", sbus });
const receiveHospitals=hospitals=>({type: "RECEIVE_HOSPITALS", hospitals });
const receiveReps=reps=>({type: "RECEIVE_REPS", reps });

const api=async (method,item,params={})=>{
	const link= "http://localhost:5000/hospAllocation/"+item;
	if(method==='get') return (await axios.get(link,{params})).data
	if(method==='post') return (await axios.post(link,params)).data
	if(method==='delete') return (await axios.delete(link,{params})).data
}
export const smart= {
	fetchHome:()=>{
		return async dispatch=>{
			const sbus=await api("get","sbu");
			// console.log('got result >>>',sbus)
			dispatch(receiveSbus(sbus));
		}
	},
	fetchRep:(params)=>{
		return async dispatch => {
  			const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName:'HomeList'}));
			dispatchUI({status:'loading'})
			const reps=await api("get","rep",params);
			dispatch(receiveReps(reps));
			dispatchUI({status:'finished',show:'rep',page:1})
		}
	},
	fetchHospital:(params)=>{
		return async dispatch => {
  			const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName:'HomeList'}));
			dispatchUI({status:'loading'})
			const hosps=await api("get","hospital",params);
			dispatch(receiveHospitals(hosps));
			dispatchUI({status:'finished',show:'hosp',page:1})
			console.log(hosps);
		}
	},
	fetchAllocation:({...params})=>{
		return async dispatch => {
			const allocation=await api("get","allocation",params);
			// dispatch(receiveHospitals(hosps));
			console.log(allocation);
		}
	}
}