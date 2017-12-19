import {questionList} from "../initData";
import {newArray,ran,uniqueKey} from "../global";
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
	const q=uniqueKey({
		self:{arr:questionList,key:"short"},
		removing:{arr:removeList,key:"question"}})
  .ran();
  const question={ask:q.full,answer:q.short}
  // console.log(questionList.newArray());
  // console.log(newArray([1,2,3]));
  // console.log(AArray().ran);
	// const records=store.getState().records.map(e=>e.question);
	// const allQuestion=questionList.map(e=>e.short);
	// const ran=ranUnique(allQuestion,5,records);
	// const question_=questionList.find(ele=>ele.short===ran);
	// const question={ask:question_.full,answer:question_.short};
	return {
		type: "NEW_QUESTION"
		,question
	};
};