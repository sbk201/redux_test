import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TodosList=({todos,toggleTodo,deleteTodo})=>{
	const onClick=(obj)=>{
		toggleTodo(obj.createdAt);
	}
	const onDelete=(obj)=>{
		deleteTodo(obj.createdAt);
	}
	const Item=styled.span`
	text-decoration: ${props => props.done ? 'line-through' : 'none'};
	`;
	return (
		<div>
			<h1>TodosList</h1>
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
	// onClick:PropTypes.func.isRequired,
	// question:PropTypes.shape({
		// ask: PropTypes.string.isRequired,
		// answer: PropTypes.string.isRequired,
	// }).isRequired
};
export default TodosList;