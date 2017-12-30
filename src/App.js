import GlobalJs from "./global";
import React, { Component } from "react";
import "react-dom";
import styled from "styled-components";
// import QuestionContainer from './containers/QuestionContainer'

class App extends Component {
	render(){
		window.loop=GlobalJs.loop;
		const wraperCss=`
			display: grid;
			height:100vh;
			grid-gap:2px;
			box-shadow: inset 0px 0px 0px 1px black;`
		const Wraper1=styled.div`
			${wraperCss}
			grid-template-columns: 1fr 6em;
			@media screen and (min-width: 800px) {
				grid-template-columns: 1fr 10em;
  			}
		}
		`
		// const Wraper2=styled.div`
		// 	${wraperCss}
		// 	grid-template-rows: 2em 1fr;
		// `
		return (
			<Wraper1>
			Todo
			</Wraper1>
			
		);
	}
}
			
			
			

export default App;