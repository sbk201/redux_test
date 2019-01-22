import {isDev} from "./init/global";
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
export const setInputs=inputs=>({type: "SET_INPUTS",inputs});
export const insertInputs=inputs=>({type: "INSERT_INPUTS",inputs});

export const getTodos=todos=>({type: "GET_TODOS", todos });
export const getNews=news=>({type: "GET_NEWS", news });
export const addJob=job=>({type: "ADD_JOB", job });

// const toNull=firebase.firestore.FieldValue.delete;

export const smart={
	// listenNews: ()=> dispatch=>{
	// 	coll('newspaper').onSnapshot(()=>dispatch(smart.fetchNews()))
	// },
	// fetchNews: ()=> async dispatch=>{
	// 	const toData=doc=>({...doc.data(),id:doc.id});
	// 	// const w=['removed','==',false];
	// 	const data=(await coll('newspaper').limit(20).get()).docs.map(toData);
	// 	dispatch(getNews(data));
	// 	console.log("fetch",data);
	// },
	// listenTodos: ()=> dispatch=>{
	// 	coll('todos').onSnapshot(()=>dispatch(smart.fetchTodos()))
	// },
}