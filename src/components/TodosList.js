import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TodosList=({UI,updateUI,todos,toggleTodo,deleteTodo})=>{
	const onClick=(obj)=>{
		toggleTodo(obj.createdAt);
	}
	const onDelete=(obj)=>{
		deleteTodo(obj.createdAt);
	}
	const modeNext= UI.mode==='a' ? 'b':'a';
	const switchMode=()=>updateUI({mode:modeNext});
	const addNum=()=>updateUI({number:UI.number+1});
	const Item=styled.span`
	text-decoration: ${props => props.done ? 'line-through' : 'none'};
	`;
	return (
		<div>
			<h1>TodosList</h1>
			<button onClick={switchMode}>Switch Mode :{UI.mode}</button>
			<button onClick={addNum}>UI number :{UI.number}</button>
			{todos.map((ele,index)=>{
				const node=<div key={index}>
				<Item onClick={()=>onClick(ele)} done={ele.done}>
				{index+1}: {ele.text} 
				</Item>
				<span> <button onClick={()=>onDelete(ele)}>X</button></span>
				</div>
				return node})}
		</div>
	);
};

TodosList.propTypes = {
	updateUI:PropTypes.func.isRequired,
	toggleTodo:PropTypes.func.isRequired,
	deleteTodo:PropTypes.func.isRequired,
	todos:PropTypes.arrayOf(PropTypes.shape({})).isRequired
	// question:PropTypes.shape({
		// ask: PropTypes.string.isRequired,
		// answer: PropTypes.string.isRequired,
	// }).isRequired
};
export default TodosList;