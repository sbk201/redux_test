import axios from "axios";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
const link={
	message:"http://localhost:5000/data",
}

const getMessageApi=async ()=>(await axios.get(link.message)).data;
const addMessageApi=async params=>(await axios.post(link.message,params)).data;
const delMessageApi=async _id=>(await axios.delete(link.message,{data:{_id}})).data;
export const smart=(function() {
	return {
		getMessage: ()=>async dispatch => {
			const message=await getMessageApi();
			dispatch(getMessage(message));
			console.log('got message,',message);
		},
		addMessage: param=> async dispatch => {
			const {text,date}=await addMessageApi(param);
			dispatch(addMessage({text,date}));
		},
		delMessage: _id=> async dispatch => {
			const result=await delMessageApi(_id);
			dispatch(delMessage(_id));
		}
	}
})();