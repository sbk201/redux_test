import React, { Component } from "react";
import "react-dom";
import MainContainer from './containers/MainContainer'
import AdminContainer from './containers/AdminContainer'
import AllocateContainer from './containers/AllocateContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
	render(){
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
		return (
			<Router>
				<div>
					<h1>Cook Customer Contact Allocation</h1>
					<Route exact path="/" component={MainContainer} />
					<Route path="/allocate" component={AllocateContainer} />
					<Route path="/admin" component={AdminContainer} />
				</div>
			</Router>
		);
	}
}


			

export default App;