import React from "react";
// import PropTypes from "prop-types";

const getProps=props=>{
	const Item=({todo})=><div>{todo._id} , {todo.info}</div>
	const itemFn=(todo,i)=> <Item todo={todo} key={i}/>;
	const Items=({todos})=>todos.map(itemFn)
	return {Items}
}
const Todo=props=>{
  	const {todos}=props;
  	const {Items}=getProps(props);
	return (
		<div> 
			<h1>Todos component</h1>
			<div><Items todos={todos}/></div>
		</div>
	);
}
export default Todo