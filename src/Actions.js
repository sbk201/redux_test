import firebase,{coll} from './fireBase';
import axios from "axios";
// import {isTest,dummyData} from './init/global';

export const checkUser=()=>{
	return async dispatch=>{
		firebase.auth().onAuthStateChanged(user=> dispatch(receiveUserProfile(user)))
	}
}
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
// export const selectReps=id=>({type: "SELECT_REP", id });
const receiveUserProfile=userProfile=>({type: "RECEIVE_USER_PROFILE", userProfile });
// const receiveHospitals=hospitals=>({type: "RECEIVE_HOSPITALS", hospitals });
// const receiveReps=reps=>({type: "RECEIVE_REPS", reps });

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
			// dispatch(receiveSbus(sbus));
		}
	},
	fetchingMessage:()=>{
		return async dispatch => {
			coll('messages').onSnapshot(snap=>{
				console.log('on change');
				console.log(snap.docs.map(doc=>doc.data()))
				// snap.docChanges().forEach(change=> console.log(change.doc.data()))
			})
		}
	},
}