import React from "react";
import Tags from "./Tags";
// import PropTypes from "prop-types";
import {mapProp} from "../init/global";

const getProps=props=>{
	const onDelete=id=>e=>console.log(`delete ${id}`);
	const Items=mapProp((todo,i)=>
		<div key={i}>
			<button onClick={onDelete(todo.id)}>X</button> {todo.id} , {todo.info}<br/>
			<Tags data={todo.tags} pid={todo.id}/><br/>
		</div>)
	return {Items};
};
const Todo=props=>{
  	const {todos,postTodo}=props;
  	const {Items}=getProps(props);
    const onEnter= fn=> e=> e.keyCode === 13 && fn(e.target.value);
	return (
		<div> 
			<h1>Todos component</h1>
			<div><Items todos={todos}/></div>
		    <input onKeyUp={onEnter(postTodo)}/>
		</div>
	);
};
export default Todo;