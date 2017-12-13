import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {questionList} from "../initData";

const Selection=({question,recordAt,newQuestion})=>{
	const listOne=questionList.filter(ele=>ele.index==="one");
	const listTwo=questionList.filter(ele=>ele.index==="two");
	const list=listOne.map((ele1,th)=>{
		const ele2=listTwo[th] ? listTwo[th] : {full:""};
		return [ele1.short,ele2.short];
	});
	const checkAnswer= e=>{
		const picked=e.target.innerText;
		const answer=question.answer;
		// const timeSpent=() - recordAt;
		picked===answer?
		newQuestion(new Date()) :
		console.log('wrong');
	};
	const Button=styled.button`
		width:8em;
		height:2em;
	`;
	return (
		<table>
			<thead>
				<tr><th>First</th><th>Second</th></tr>
				{/*<tr><th>希伯來語及阿拉米語經卷</th><th>希臘語經卷</th></tr>*/}
			</thead>
			<tbody>
				{list.map((name,index)=>(
					<tr key={index}><td>
						<Button onClick={e=>checkAnswer(e)}>{name[0]}</Button>
					</td>
					<td>
						<Button  onClick={e=>checkAnswer(e)} >{name[1]}</Button>
					</td></tr>))}
			</tbody>
			
		</table>
	);
};

Selection.propTypes = {
	newQuestion:PropTypes.func.isRequired,
	question:PropTypes.shape({
		ask: PropTypes.string.isRequired,
		answer: PropTypes.string.isRequired,
	}).isRequired
};
export default Selection;