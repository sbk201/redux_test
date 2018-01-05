import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";

const Apidata=({data})=>{
	const onClick=(input)=>{
		// const text=input.value;
		// addTodo(text);
	};
	// const Textarea=styled.textarea`
		// width:95vw;
		// height:80vh;
	// `;
			/*<Textarea value={JSON.stringify(data,null,2)}/>*/
	// <div>Question : {question.ask} (answer: {question.answer})</div>
	return (
		<div style={{textAlign:"center"}}>
			<h1>Apidata</h1>
			<div>id {data.id}</div>
			<div>name {data.name}</div>
			<div>image {data.image}</div>
			<div>modified {data.modified}</div>
		</div>
	);
};

// Apidata.propTypes = {
	// text: PropTypes.string,
	// done: PropTypes.bool,
	// createdAt: PropTypes.string
// };
export default Apidata;