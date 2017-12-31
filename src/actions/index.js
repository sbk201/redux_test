// import {questionList} from "../initData";
// import {ran,uniqueKey} from "../global";
// import store from "../index";
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