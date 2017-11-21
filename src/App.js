import React, { Component } from "react";
import "react-dom";
import "./App.css";
import Counter from "./Counter.js";
// import TodoApp from "./components/TodoApp.js";


class App extends Component {
	// constructor(){
	// 	super();
	// 	this.state={
	// 	}
	// }
	render(){
		return (
			<div>
				<Counter/>
			</div>
		);
	}
}

class Test extends Component {
	constructor(){
		super();
		this.state={
		};
	}
	focusText(){
		this.input.focus();
	}
	render(){
		console.log(this);
		// let that=this;
		return (
			<ListOfTenThings {...this}/>
		);
	}
}

function Repeat(props) {
	let items = [];
	for (let i = 0; i < props.numTimes; i++) {
		items.push(props.children(i));
	}
	return <div>{items}</div>;
}

function ListOfTenThings(p) {
	return (
		<div>
			<input type="button" name="click" onClick={e=> p.focusText()}/>
			<Repeat numTimes={10} num2={4}>
				{(index) => <div key={index}>This is item {index} in the list</div>}
			</Repeat>
		</div>
	);
}
export default App;