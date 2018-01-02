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