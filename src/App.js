import React, { Component } from "react";
import "react-dom";
import MainContainer from './containers/MainContainer'
import CustomerListContainer from './containers/CustomerListContainer'

class App extends Component {
	render(){
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
				{/*<ContactListContainer/>*/}
		return (
			<div>
				<h1>Cook Customer Contact Allocation System</h1>
				<MainContainer/><br/>
				<CustomerListContainer/>
			</div>
			
		);
	}
}
			
			
			

export default App;