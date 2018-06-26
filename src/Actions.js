import firebase,{coll} from './fireBase';
import axios from "axios";
// import {isTest,dummyData} from './init/global';
window.coll=coll;
export const addText=params=>dispatch=>coll('messages').add(params);
export const delText=id=>dispatch=>coll('messages').doc(id).delete();
export const updateMessage=({id,...params})=>dispatch=>coll('messages').doc(id).update(params);


export const checkUser=()=> dispatch=>
	firebase.auth().onAuthStateChanged(user=> {
		dispatch(receiveUserInfo(user))
		dispatch(receiveUserProfile(user))
	})


export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
// export const selectReps=id=>({type: "SELECT_REP", id });
const receiveUserInfo=userInfo=>({type: "RECEIVE_USER_INFO", userInfo });
const receiveUserProfile=userProfile=>({type: "RECEIVE_USER_PROFILE", userProfile });
const receiveMessages=messages=>({type: "RECEIVE_MESSAGES", messages });
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
				const convert=doc=>({...doc.data(),id:doc.id});
				const output=snap.docs.map(convert);
				dispatch(receiveMessages(output));
				// snap.docChanges().forEach(change=> console.log(change.doc.data()))
			})
		}
	},
	updateUserProfile:name=>{
		return async dispatch => {
			const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName:"UserBarConta"}));
			const user = firebase.auth().currentUser;
			const {uid}=user;
			await user.updateProfile({displayName: name }).catch(console.error);
	        await coll("users").doc(uid).set({name, uid}).catch(console.error);
	        dispatch(receiveUserProfile({...user,displayName:name}));
	        console.log('updated userProfile');
	        // dispatchUI({modal:false});
	    }
	}
}