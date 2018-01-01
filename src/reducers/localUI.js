import merge from "lodash/merge";
const clone=(it)=>JSON.parse(JSON.stringify(it));
const localUI = (state = [], action) => {
	switch (action.type) {
	case "UPDATE_UI":
	const {type,contName,...other}=action;
	const newState=clone(merge(state,{[action.contName]:other}));
	return newState
	default:
		return state;
	}
};

export default localUI;