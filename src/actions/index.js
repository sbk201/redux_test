import axios from "axios";
// import store from "../index";
export const updateUI = (cmd) => {
	return {
		type: "UPDATE_UI",
		...cmd
	};
};
export const addTodos = ({text, done, createdAt}) => {
	return {
		type: "ADD_TODOS",
		text,
		done,
		createdAt,
	};
};
export const toggleTodo = (createdAt) => {
	return {
		type: "TOGGLE_TODO",
		createdAt,
	};
};
export const deleteTodo = (createdAt) => {
	return {
		type: "DELETE_TODO",
		createdAt,
	};
};
export const toggleFilter = (filter) => {
	return {
		type: "TOGGLE_FILTER",
		filter,
	};
};
const requestPokes=(poke)=> {
	return {
		type: "REQUEST_POKES",
		poke
	};
};
function receivePokes(poke, json) {
	return {
		type: "RECEIVE_POKES",
		poke,
		json: json.data,
		receivedAt: Date.now()
	};
}
// let headers = new Headers({
// 'Access-Control-Allow-Origin':'*',
// 'Access-Control-Allow-Headers': 'Content-Type'
// });
// let myInit = { method: 'GET',
// mode: 'no-cors',
// cache: 'default' ,
// 'Access-Control-Allow-Origin':'*',
// 'Access-Control-Allow-Headers': 'Content-Type'};

// var instance = axios.create({
//   baseURL: 'https://api.flickr.com/services/feeds/photos_public.gne',
//   timeout: 30000,
//   headers: {"Access-Control-Allow-Origin": "*",
// 				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
// 				"Access-Control-Allow-Headers": "Authorization",}
// });
// console.log(instance)


export const fetchPoke=(name)=>{
	let term="apple";
	// const link='https://api.github.com/users/sbk201'
	const link="https://api.flickr.com/services/feeds/photos_public.gne?tags=" + term + "&format=json&jsoncallback=?";
	const link2="?tags=" + term + "&format=json&jsoncallback=?";
	const gitLink="https://api.github.com/";
	return dispatch => {
		console.log("fetchPoke");
		// const headers={headers:{"Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
		// "Access-Control-Allow-Headers": "Authorization",}};
		const config = {headers: {
			"Access-Control-Allow-Origin": "*",
			// "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
			// "Access-Control-Allow-Headers": "Authorization"
		} };
		// fetch(link)
		axios.get(link,config)
		// .then((resp) => resp.json())
			.then((res)=>console.log(res.data));
		// return fetch(`https://pokeapi.co/api/v1/sprite/1/`,myInit)
		// .then(response => response.json())
		// .then(json => console.log(json))
		// dispatch(receivePokes(name, json))
	};
};