import {isDev} from "./init/global";
import firebase,{coll} from './fireBase';
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
export const setInputs=inputs=>({type: "SET_INPUTS",inputs});
export const insertInputs=inputs=>({type: "INSERT_INPUTS",inputs});

export const getTodos=todos=>({type: "GET_TODOS", todos });

const toNull=firebase.firestore.FieldValue.delete;

export const smart={
	fetchTodos: ()=> async dispatch=>{
		const toData=doc=>({...doc.data(),id:doc.id});
		const data=(await coll('todos').get()).docs.map(toData);
		dispatch(getTodos(data));
		console.log(data);
	},
	postTodo: todo=> async dispatch=>{
		console.log(todo);
	},
}