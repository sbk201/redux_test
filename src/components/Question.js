import React from "react";
import PropTypes from "prop-types";

const Question=({question,onClick})=>{
	const isHide=question.ask ? "hide" : '';
			// <div>Question : {question.ask} (answer: {question.answer})</div>
	return (
		<div style={{height: "3em", position: "fixed", backgroundColor: "white", width: "100%", top: "0"}}>
			<div>Question : {question.ask}</div>
			<div><button onClick={onClick} className={isHide}>Start</button></div>
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