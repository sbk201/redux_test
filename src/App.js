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
		return (
			<div>
				<MainContainer/>
				<CustomerListContainer/>
			</div>
			
		);
	}
}
			
			
			

export default App;