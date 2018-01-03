import {merge,cloneDeep,flow} from "lodash";
const localUI = (state = [], action) => {
	switch (action.type) {
	case "UPDATE_UI":
	const {type,contName,...other}=action;
	const stateAdding={[action.contName]:other}
	const newState=flow(merge,cloneDeep)(state,stateAdding);
	// const newState=cloneDeep(merge(state,{[action.contName]:other}));
	return newState
	default:
		return state;
	}
};

export default localUI;