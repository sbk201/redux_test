import axios from "axios";
// import store from "../index";
export const updateUI = (cmd) => {
	return {
		type: "UPDATE_UI",
		...cmd
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
function receiveTodos(todos) {
	return {
		type: "RECEIVE_TODOS",
		todos,
	};
}
function addTodos(todos) {
	return {
		type: "ADD_TODOS",
		todos
	};
}
function removeTodos(_id) {
	return {
		type: "REMOVE_TODOS",
		_id
	};
}

const link="http://localhost:5000/data";
export const deleteTodos=(_id)=>{
	return dispatch => {
		const data = {_id};
		axios.delete(link,{data})
			.then(res=>{
				if(res.data) dispatch(removeTodos(_id));
			});
	};
};

export const postTodos=(text)=>{
	return dispatch => {
		const data = {text};
		axios.post(link,{},{data})
			.then((res)=>{
				dispatch(addTodos(res.data))
			});
	};
};

export const fetchTodos=()=>{
	// const link='https://api.github.com/users/sbk201'
	// const gitLink="https://api.github.com/";
	return dispatch => {
		const config = {headers: {
			// "Access-Control-Allow-Origin": "*",
		} };
		axios.get(link,config)
			.then((res)=>{
				console.log(res.data)
				dispatch(receiveTodos(res.data))
			});
	};
};