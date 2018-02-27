import React, { Component } from "react";
import "react-dom";
import styled from "styled-components";
import ApidataContainer from './containers/ApidataContainer'
import MainContainer from './containers/MainContainer'

class App extends Component {
	render(){
		const Wraper1=styled.div`
		`
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
		return (
			<Wraper1>
				<MainContainer/>
			</Wraper1>
			
		);
	}
}
			
			
			

export default App;