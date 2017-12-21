import { connect } from "react-redux";
// import { newQuestion,addRecord } from '../actions'
import Records from "../components/Records";

const toTimeSpent= records=>{
	const timeArr=records.map(ele=>ele.time);
	const timeDoneArr=timeArr.slice(1)
		.map((ele,th)=>ele-timeArr[th])
		.map(ele=>~~(ele/100)/10);
	const result=records.slice(1).map((ele,th)=>{return {time:timeDoneArr[th],question:ele.question};});
	return result;
};
const getHardQuestions=theArr=>{
	const sortQuestion=(a,b)=>a.question>b.question;
	const sortTime=(a,b)=> a.question!==b.question ? 0 : a.time>b.time;
	const result=theArr.slice()
		// .sort(sortQuestion)
		.sort(sortTime)
		.reduce((acc,next)=>acc.find(ele=>ele.question===next.question) ? acc : [...acc,next],[]);
	return result;
};
const mapStateToProps = (state) => {
	const spentArr=toTimeSpent(state.records);
	const hardQuestions=getHardQuestions(spentArr);
	return {spentArr,hardQuestions};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// newQuestion:()=>{
		// dispatch(fn());
		// }
	};
};

const SelectionContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Records);

export default SelectionContainer;