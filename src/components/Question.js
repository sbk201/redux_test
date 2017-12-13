import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Question=({question,onClick})=>{
	const isStart=question.ask;
	// const height={height:"2em"};
	const Div1=styled.div`
		display:${isStart? 'none' : 'inherit'}
	`;
	const Div2=styled.div`
		display:${isStart? 'inherit' : 'none'}
	`;
	// <div>Question : {question.ask} (answer: {question.answer})</div>
	return (
		<div>
			<Div1><button onClick={()=>onClick(new Date())}>Start</button></Div1>
			<Div2>Question : {question.ask}</Div2>
		</div>
	);
};

Question.propTypes = {
	onClick:PropTypes.func.isRequired,
	question:PropTypes.shape({
		ask: PropTypes.string.isRequired,
		answer: PropTypes.string.isRequired,
	}).isRequired
};
export default Question;