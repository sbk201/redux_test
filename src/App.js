import React, { Component } from "react";
import "react-dom";
import styled from "styled-components";
import MainContainer from './containers/MainContainer'
import CustomerListContainer from './containers/CustomerListContainer'

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
				<CustomerListContainer/>
			</Wraper1>
			
		);
	}
}
			
			
			

export default App;