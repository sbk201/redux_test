import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";
import { Component } from 'react';
class Apidata extends Component {
	componentDidMount() {
		this.props.fetchTodos();
  }
  onEnter=(e)=>{
  	const isEnter=e.keyCode===13;
  	const text=e.target.value;
  	if(isEnter&&text) {
  		this.props.postTodos(text)
  		e.target.value="";
  	};
  };
  render(){
  	const {data,deleteTodos}=this.props;
  	const Input=()=>
  	<input placeholder="text..." style={{width:"98%"}} onKeyUp={e=>this.onEnter(e)}
  	ref={(input) => { this.textInput = input; }}/>;
	return (
		<div>
		 <Input/>
			<div>
					{data.map((todo,th)=>
						<div key={th}>{th} {todo.text} <a href="#" onClick={()=>deleteTodos(todo._id)}>X</a></div>
					)}
			</div>
		</div>
	);
  	
  }
}
// Apidata.propTypes = {
	// text: PropTypes.string,
	// done: PropTypes.bool,
	// createdAt: PropTypes.string
// };
export default Apidata;