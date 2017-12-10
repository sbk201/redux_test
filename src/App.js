import React, { Component } from "react";
import "react-dom";
import "./App.css";
import QuestionContainer from './containers/QuestionContainer'
import SelectionContainer from './containers/SelectionContainer'


class App extends Component {
	render(){
		return (
			<div>
			<QuestionContainer/>
			<hr/>
			<SelectionContainer/>
			</div>
		);
	}
}

export default App;