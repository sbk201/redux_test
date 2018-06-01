import axios from "axios";
import {isTest,dummyData} from './init/global';

export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
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
			console.log('got result >>>',sbus)
			dispatch(receiveSbus(sbus));
		}
	},
	getHospList:({method,...params})=>{
		return async dispatch => {
			if(method==='rep') {
				const reps=await api("get","rep",params);
				dispatch(receiveReps(reps));
				console.log(reps);
			}
			if(method==='hospital') {
				const hosps=await api("get","hospital",params);
				dispatch(receiveHospitals(hosps));
				console.log(hosps);
			}
			if(method==='repId') {
				const hosps=await api("get","hospital",params);
				// dispatch(receiveHospitals(hosps));
				console.log(hosps);
			}
		}
	},
}