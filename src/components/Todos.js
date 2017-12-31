import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Todos=({todos,addTodo})=>{
	const onClick=(input)=>{
		const text=input.value
		addTodo(text)
	}
	// const height={height:"2em"};
	// const Div1=styled.div`
	// 	display:${isStart? 'none' : 'inherit'}
	// `;
	// const Div2=styled.div`
	// 	display:${isStart? 'inherit' : 'none'}
	// `;
	// <div>Question : {question.ask} (answer: {question.answer})</div>
	return (
		<div>
			<h1>Todos</h1>
			<input ref={(input) => { this.textInput = input; }}/>
			<button onClick={()=>onClick(this.textInput)}>Add</button>
		</div>
	);
};

Todos.propTypes = {
	// onClick:PropTypes.func.isRequired,
	// question:PropTypes.shape({
		// ask: PropTypes.string.isRequired,
		// answer: PropTypes.string.isRequired,
	// }).isRequired
};
export default Todos;