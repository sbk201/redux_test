import React, { Component } from "react";
import "react-dom";
import MainContainer from './containers/MainContainer'
import CustomerListContainer from './containers/CustomerListContainer'
import AllocateContainer from './containers/AllocateContainer'

class App extends Component {
	render(){
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
		return (
			<div>
				<h1>Cook Customer Contact Allocation</h1>
				<MainContainer/><br/>
				<CustomerListContainer/>
				<AllocateContainer/>
			</div>
			
		);
	}
}
			
			
			

export default App;