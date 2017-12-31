import GlobalJs from "./global";
import React, { Component } from "react";
import "react-dom";
import styled from "styled-components";
import TodosContainer from './containers/TodosContainer'
import TodosListContainer from './containers/TodosListContainer'

class App extends Component {
	render(){
		window.loop=GlobalJs.loop;
		const Wraper1=styled.div`
		`
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
		return (
			<Wraper1>
				<TodosContainer/>
				<br/>
				<TodosListContainer/>
			</Wraper1>
			
		);
	}
}
			
			
			

export default App;