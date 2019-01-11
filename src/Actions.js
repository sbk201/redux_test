import {isDev} from "./init/global";
import {coll} from './fireBase';
import {isEmpty, takeLast} from 'ramda';
// import store from "../index";
export const updateUI=cmd=>({type: "UPDATE_UI", ...cmd});
export const getMessage=message=>({type: "GET_MESSAGE", message });
export const addMessage=message=> ( {type: "ADD_MESSAGE", ...message});
export const delMessage=_id=> ( {type: "DELETE_MESSAGE", _id});
export const setInputs=inputs=>({type: "SET_INPUTS",inputs});
export const insertInputs=inputs=>({type: "INSERT_INPUTS",inputs});

export const getTodos=todos=>({type: "GET_TODOS", todos });
export const getNews=news=>({type: "GET_NEWS", news });

// const toNull=firebase.firestore.FieldValue.delete;
export const smart={
	// fetchNewsInit: ()=>{
		// const ref=coll('newspaper').orderBy("published", "desc");
	// }
	fetchNews: (page=1,entry=20)=> async dispatch=>{
		const toData=doc=>({...doc.data(),id:doc.id});
		// const w=['removed','==',false];
		const ref=coll('newspaper').orderBy("published", "desc");
		// console.log('page is :',page && page.author);
		const limit= page*entry
		console.log(page);
		console.log(limit);
		const allData=(await ref.limit(limit).get()).docs.map(toData);
		const data=takeLast(entry, allData);
		dispatch(getNews(data));
		console.log("fetch",data);
	},
	listenTodos: ()=> dispatch=>{
		coll('todos').onSnapshot(()=>dispatch(smart.fetchTodos()))
	},
	fetchTodos: ()=> async dispatch=>{
		const toData=doc=>({...doc.data(),id:doc.id});
		const w=['removed','==',false];
		const data=(await coll('todos').where(...w).get()).docs.map(toData);
		dispatch(getTodos(data));
		console.log("fetch",data);
	},
	postTag: ({pid,tags})=> async dispatch=>{
		coll('todos').doc(pid).update({tags});
		console.log(pid,tags);
	},
	postTodo: text=> async dispatch=>{
		const todo={createdDate:new Date(),info:text,removed:false,tags:[]};
		const res=await coll('todos').add(todo);
		console.log(res);
	},
	deleteTodo: id=> dispatch=> coll('todos').doc(id).update({removed:true}),
}
// search tag
// coll('todos').where("tags", "array-contains", "second").get().then(ref=>{
	// const data=ref.docs.map(doc=>doc.data());
	// console.log(data)
// })


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