import React, { Component } from "react";
import "react-dom";
import "./App.css";
import styled from "styled-components";
import QuestionContainer from './containers/QuestionContainer'
import RecordsContainer from './containers/RecordsContainer'
import SelectionContainer from './containers/SelectionContainer'
import { newQuestion,addRecord } from './actions'

class App extends Component {
	render(){
		document.addEventListener('keyup',ele=>{
			// console.log(ele.keyCode)
			if(ele.keyCode!==17) return;
			let i=10;
			while(i--) {
	      window.store.dispatch(newQuestion());
	      window.store.dispatch(addRecord(1,'abc'));
			}
		})
		const wraperCss=`
			display: grid;
			height:100vh;
			grid-gap:2px;
			box-shadow: inset 0px 0px 0px 1px black;`
		const Wraper1=styled.div`
			${wraperCss}
			grid-template-columns: 1fr 5em;
			@media screen and (min-width: 800px) {
				grid-template-columns: 1fr 10em;
  			}
		}
		`
		const Wraper2=styled.div`
			${wraperCss}
			grid-template-rows: 2em 1fr;
		`
		return (
			<Wraper1>
				<Wraper2>
					<QuestionContainer/>
					<div style={{overflowY:"auto"}}>
					<SelectionContainer/>
					<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...
					<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...
					<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...
					<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...<br/><br/>...
					</div>
				</Wraper2>
				<RecordsContainer/>
			</Wraper1>
			
		);
	}
}
			
			
			

export default App;