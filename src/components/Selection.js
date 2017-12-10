import React from "react";
import PropTypes from "prop-types";
import {questionList} from "../initData";

const Selection=({question,newQuestion})=>{
	const listOne=questionList.filter(ele=>ele.index==="one");
	const listTwo=questionList.filter(ele=>ele.index==="two");
	const list=listOne.map((ele1,th)=>{
		const ele2=listTwo[th] ? listTwo[th] : {full:""};
		return [ele1.short,ele2.short];
	});
	const checkAnswer= e=>{
		const picked=e.target.innerText;
		const answer=question.answer;
		picked===answer?
		newQuestion() :
		console.log('wrong');
	};
	return (
		<table>
			<thead>
				<tr><th>希伯來語及阿拉米語經卷</th><th>希臘語經卷</th></tr>
			</thead>
			<tbody>
				{list.map((name,index)=>(
					<tr key={index}><td>
						<button onClick={e=>checkAnswer(e)}>{name[0]}</button>
					</td>
					<td>
						<button  onClick={e=>checkAnswer(e)}
						hide={name[1]? undefined : 'true'}>{name[1]}</button>
					</td></tr>))}
			</tbody>
			
		</table>
	);
};

Selection.propTypes = {
	newQuestion:PropTypes.func.isRequired,
	// question:PropTypes.shape({
	// 	ask: PropTypes.string.isRequired,
	// 	answer: PropTypes.string.isRequired,
	// }).isRequired
};
export default Selection;