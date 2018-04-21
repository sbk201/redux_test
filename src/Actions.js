import axios from "axios";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
const getUsers=users=>({type: "GET_USERS", users });
export const addUsers=users=>({type: "ADD_USERS", users });
const link={
	message:"http://localhost:5000/data",
	users:"http://localhost:5000/users",
}

const getMessageApi=async ()=>(await axios.get(link.message)).data;
const addMessageApi=async params=>(await axios.post(link.message,params)).data;
const delMessageApi=async _id=>(await axios.delete(link.message,{data:{_id}})).data;
const getUsersApi=async ()=>(await axios.get(link.users)).data;
const addUsersApi=async params=>(await axios.post(link.users,{})).data;

export const smart=(function() {
	return {
		message:{
			get: ()=>async dispatch => {
				const message=await getMessageApi();
				dispatch(getMessage(message));
				console.log('got message,',message);
			},
			add: param=> async dispatch => {
				const {text,date}=await addMessageApi(param);
				dispatch(addMessage({text,date}));
			},
			del: _id=> async dispatch => {
				const result=await delMessageApi(_id);
				dispatch(delMessage(_id));
			}
		},
		users:{
			get: ()=>async dispatch => {
				const users=await getUsersApi();
				dispatch(getUsers(users));
				console.log('users',users);
			},
			add: ()=>async dispatch => {
				const users=await addUsersApi();
				console.log('add')
				dispatch(addUsers(users));
				// const users=await addUsersApi();
				// dispatch(getUsers(users));
				// console.log('got users,',users);
			},
			// add: param=> async dispatch => {
			// 	const {text,date}=await addMessageApi(param);
			// 	dispatch(addMessage({text,date}));
			// },
			// del: _id=> async dispatch => {
			// 	const result=await delMessageApi(_id);
			// 	dispatch(delMessage(_id));
			// }
		}
	}
})();