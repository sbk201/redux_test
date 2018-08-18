import {isDev} from "./init/global";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
export const getIdeas=ideas=>({type: "GET_IDEAS", ideas });
// const link={
	// message:"http://localhost:5000/data",
// }
// const api=async (method,item,params={})=>{
//     const link2= "http://localhost:5000/custAllocation/"+item;
//     if(method==='get') return (await axios.get(link2,{params})).data
//     if(method==='post') return (await axios.post(link2,params)).data
//     if(method==='delete') return (await axios.delete(link2,{params})).data
// }
export const smart=(function() {
	return {
		getIdeas: ()=>async dispatch => {
			// const get=()=>isDev ? dataImport : getIdeasApi();
			// dispatch(getIdeas(await get()));
		},
		// getMessage: ()=>async dispatch => {
		// 	const message=await getMessageApi();
		// 	dispatch(getMessage(message));
		// 	console.log('got message,',message);
		// },
		// addMessage: param=> async dispatch => {
		// 	const {text,date}=await addMessageApi(param);
		// 	dispatch(addMessage({text,date}));
		// },
		// delMessage: _id=> async dispatch => {
		// 	const result=await delMessageApi(_id);
		// 	dispatch(delMessage(_id));
		// }
	}
})();
