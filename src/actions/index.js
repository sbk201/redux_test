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
  }
}
function receivePokes(poke, json) {
  return {
    type: "RECEIVE_POKES",
    poke,
    json: json.data,
    receivedAt: Date.now()
  }
}

export const fetchPoke=(name)=>{
	return dispatch => {
    dispatch(requestPokes(name))
    return fetch(`https://pokeapi.co/api/v1/sprite/1/`)
      .then(response => response.json())
      .then(json => dispatch(receivePokes(name, json)))
  }
}