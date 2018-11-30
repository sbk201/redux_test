import {isDev} from "./init/global";
import firebase,{coll} from './fireBase';
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
export const setInputs=inputs=>({type: "SET_INPUTS",inputs});
export const insertInputs=inputs=>({type: "INSERT_INPUTS",inputs});
const receiveUserInfo=(userInfo={})=> ({type: "RECEIVE_USER_INFO", userInfo });

export const getTodos=todos=>({type: "GET_TODOS", todos });

// const toNull=firebase.firestore.FieldValue.delete;

export const smart={
	checkUser:()=> {
		return async dispatch=>{
			firebase.auth().onAuthStateChanged(async user=> {
				if(!user) return dispatch(receiveUserInfo({logged:false}));
				const username_=(await coll('users').doc(user.uid).get());
				const username= username_.data() ? username_.data().name : null;
				dispatch(receiveUserInfo({...user,username,logged:true}))
			})
		}
	},
	updateUserInfo:name=>{
		return async dispatch => {
			// const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName:"UserBarConta"}));
			const user = firebase.auth().currentUser;
			const {uid}=user;
			await user.updateProfile({displayName: name }).catch(console.error);
	        await coll("users").doc(uid).set({name, uid,rold:"user"}).catch(console.error);
	        console.log('updateUserInfo')
			dispatch(receiveUserInfo({...user,username:name,logged:true}))
	    }
	},
	fetchTodos: ()=> async dispatch=>{
		const toData=doc=>({...doc.data(),id:doc.id});
		const w=['removed','==',false];
		const data=(await coll('todos').where(...w).get()).docs.map(toData);
		dispatch(getTodos(data));
		// console.log(data);
	},
	postTodo: text=> async dispatch=>{
		const todo={createdDate:new Date(),info:text,removed:false,tags:[]};
		const res=await coll('todos').add(todo);
		console.log(res);
	},
	deleteTodo: id=> async dispatch=>{
		console.log(id);
		// const todo={createdDate:new Date(),info:text,removed:false,tags:[]};
		// const res=await coll('todos').add(todo);
		// console.log(res);
	},
}

// const ref = path => firebase.database().ref(path)
// const getValue = path => ref(path).once('value')
// const mapSnapshotToEntities = snapshot => snapshot.val().map((value, id) => ({ id, ...value }))
// const getEntities = path => getValue(path).then(mapSnapshotToEntities)

// const resolvers = {
//     Author: {
//         posts(author) {
//             return getEntities('posts').then(posts => filter(posts, { authorId: author.id }))
//         },
//     },

//     Post: {
//         author(post) {
//             return getEntities('authors').then(posts => filter(authors, { id: authorId }))
//         },
//     },
// };