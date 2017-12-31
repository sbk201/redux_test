const todos = (state = [], action) => {
	switch (action.type) {
	case "ADD_TODOS":
		const {type,...rest}=action;
		return [...state,rest];
	case "TOGGLE_TODO":{
		const createdAt=action.createdAt;
		const newState=state.map(ele=>
	        	ele.createdAt===createdAt ? Object.assign({},ele,{done:!ele.done}) : ele
		);
		return newState;
	}
	case "DELETE_TODO":{
		const createdAt=action.createdAt;
		const newState=state.filter(ele=>!(ele.createdAt===createdAt));
		return newState;
	}
	default:
		return state;
	}
};

export default todos;