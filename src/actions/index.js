import {questionList} from "../initData";
import {ran,uniqueKey} from "../global";
import store from "../index";
export const addRecord = (time,question) => {
	return {
		type: "ADD_RECORD",
		time,
		question,
	};
};

export const newQuestion = () => {
	const removeList=store.getState().records.slice(-5);
	const list=uniqueKey({
		self:{arr:questionList,key:"short"},
		removing:{arr:removeList,key:"question"}});
  const q=ran(list);
  const question={ask:q.full,answer:q.short}
	return {
		type: "NEW_QUESTION"
		,question
	};
};