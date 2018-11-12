import React from "react";
// import PropTypes from "prop-types";

const getProps=props=>{
	// const mapFn=itemArray=>item>=itemArray.map()
	const onDelete=id=>e=>console.log(`delete ${id}`);
	const Item=({todo})=><div><button onClick={onDelete(todo.id)}>X</button> {todo.id} , {todo.info}</div>
	const itemFn=(todo,i)=> <Item todo={todo} key={i}/>;
	const Items=({todos})=>todos.map(itemFn);
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