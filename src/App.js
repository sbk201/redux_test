import React, { Component } from "react";
import "react-dom";
import "./App.css";
import TodoApp from "./components/TodoApp.js";


class App extends Component {
	// constructor(){
	// 	super();
	// 	this.state={
	// 	}
	// }
	render(){
		return (
			<div>
				<TodoApp/>
			</div>
		);
	}
}

export default App;