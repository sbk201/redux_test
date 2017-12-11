import React, { Component } from "react";
import "react-dom";
import "./App.css";
import QuestionContainer from './containers/QuestionContainer'
import RecordsContainer from './containers/RecordsContainer'
import SelectionContainer from './containers/SelectionContainer'


class App extends Component {
	render(){
		return (
			<div>
			<QuestionContainer/>
			<RecordsContainer/>
			<SelectionContainer/>
			<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...
			</div>
		);
	}
}

export default App;