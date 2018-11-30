import React from "react";
import Tags from "./Tags";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
import {format} from "date-fns"
import {sortBy, prop, map, mapObjIndexed, pipe} from "ramda";

const getProps=props=>{
	const {postTag}=props;
	const S= ()=>" ";
	const Item= ( todo,i )=> 
		<div key={i}>
			<button onClick={()=>props.deleteTodo( todo.id )}>X</button> <S/>{todo.createdDate} <S/>
			 {todo.id} <br/>
			{todo.info}<br/>
			<Tags data={todo.tags} pid={todo.id} postTag={postTag}/><br/>
		</div>;
	const Items=( {todos} )=>{
		const formatDate= time=> format(time.toDate(),"DD/MM HH:mm a");
		const toDate= (val,key)=> key==="createdDate" ? formatDate(val) : val;
		const newTodos=pipe(
			sortBy( prop( "createdDate" ) ),
			map( mapObjIndexed( toDate ) ),
		)( todos );
		return newTodos.map( Item );
 	};
	return {Items};
};
const Todo=props=>{
  	const {todos,postTodo}=props;
  	const {Items}=getProps( props );
	const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Todos component</h1>
			<div><Items todos={todos}/></div>
		    <input onKeyUp={onEnter( postTodo )}/>
		</div>
	);
};
export default Todo;