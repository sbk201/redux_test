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
function receiveTodos(json) {
	return {
		type: "RECEIVE_TODOS",
		json,
		receivedAt: Date.now()
	};
}
export const deleteTodos=(id) =>{
	return {
		type: "DELETE_TODOS",
		id
	};
}

export const fetchTodos=(name)=>{
	let term="apple";
	// const link='https://api.github.com/users/sbk201'
	const link="http://localhost:5000/data";
	const gitLink="https://api.github.com/";
	return dispatch => {
		const config = {headers: {
			"Access-Control-Allow-Origin": "*",
			// "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
			// "Access-Control-Allow-Headers": "Authorization"
		} };
		// fetch(link)
		return axios.get(link,config)
			.then((res)=>{
				console.log(res.data)
				dispatch(receiveTodos(res.data))
			});
		// .then((resp) => resp.jsoTODOS())
		// return fetch(`https://pokeapi.co/api/v1/sprite/1/`,myInit)
		// .then(response => response.json())
		// .then(json => console.log(json))
		// dispatch(receiveTodos(name, json))
	};
};