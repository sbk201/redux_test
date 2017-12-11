import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Question=({question,onClick})=>{
	const isStart=question.ask;
	const height={height:"2em"};
	const Header=styled.div`
		background-color: aliceblue;
		position: fixed;
	   top: 0;
	   left: 0;
	   width: 100%;
	`;
	const Div1=styled.div`
		display:${isStart? 'none' : 'inherit'}
	`;
	const Div2=styled.div`
		display:${isStart? 'inherit' : 'none'}
	`;
	// <div>Question : {question.ask} (answer: {question.answer})</div>
	const Part=<div style={height}>
		<Div1><button onClick={onClick}>Start</button></Div1>
		<Div2>Question : {question.ask}</Div2>
		</div>;
	return (
		<div>
			<Header>
				{Part}
			</Header>
			<div>
				{Part}
			</div>
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