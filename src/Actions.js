import axios from "axios";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
const getUsers=users=>({type: "GET_USERS", users });
const addUsers=users=>({type: "ADD_USERS", users });
const delUser=_id=>({type: "DEL_USER", _id });
const link={
	message:"http://localhost:5000/data",
	users:"http://localhost:5000/users",
	login:"http://localhost:5000/users/login",
}


const loginApi=async param=>(await axios.post(link.login,param)).data;
const getMessageApi=async ()=>(await axios.get(link.message)).data;
const addMessageApi=async param=>(await axios.post(link.message,param)).data;
const delMessageApi=async _id=>(await axios.delete(link.message,{data:{_id}})).data;
const getUsersApi=async ()=>(await axios.get(link.users)).data;
const addUsersApi=async param=>(await axios.post(link.users,param)).data;
const delUserApi=async _id=>(await axios.delete(link.users,{data:{_id}})).data;

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
				const isDelete=await delMessageApi(_id);
				if(isDelete) dispatch(delMessage(_id));
			}
		},
		users:{
			login:param=>async dispatch =>{
				const logged=await loginApi(param);
				console.log('got from login ',logged)
				// dispatch(addUsers(user));
			},
			get: ()=>async dispatch => {
				const users=await getUsersApi();
				dispatch(getUsers(users));
			},
			add: param=>async dispatch => {
				const user=await addUsersApi(param);
				console.log('got',user)
				dispatch(addUsers(user));
			},
			del: _id=>async dispatch => {
				const fine=await delUserApi(_id);
				if(fine) dispatch(delUser(_id));
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