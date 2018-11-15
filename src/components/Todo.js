import React from "react";
import Tags from "./Tags";
// import PropTypes from "prop-types";
import {flow} from "lodash";
import {map} from "lodash/fp";

const getProps=props=>{
	// const mapFn=itemArray=>item>=itemArray.map()
	const onDelete=id=>e=>console.log(`delete ${id}`);
	const Item=({todo})=><div>
		<button onClick={onDelete(todo.id)}>X</button> {todo.id} , {todo.info}<br/><Tags data={todo.tags}/>
	</div>;
	const itemFn=(todo,i)=> <Item todo={todo} key={i}/>;
	const Items=({todos})=>todos.map(itemFn);


	// const mapFn=Item=>({todos})=>todos.map()
	// const The=({todos})=>flow([
			// map()
		// ])(todos)
	// const The=mapFn(
		// ({todo})=><div>
			{/*<button onClick={onDelete(todo.id)}>X</button> {todo.id} , {todo.info}<br/><Tags data={todo.tags}/>*/}
		// </div>)
		// ( (todo,i)=> <Item todo={todo} key={i}/> )
	return {Items};
};
const Todo=props=>{
  	const {todos}=props;
  	const {Items}=getProps(props);
	return (
		<div> 
			<h1>Todos component</h1>
			<div><Items todos={todos}/></div>
		</div>
	);
};
export default Todo;