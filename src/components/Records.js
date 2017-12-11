import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
		newQuestion(new Date()) :
		console.log('wrong');
	};
	const Button=styled.button`
		width:8em;
		height:2em;
	`;
	return (
		<div>
			
		</div>
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