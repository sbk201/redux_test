import React, { Component } from "react";
import "react-dom";
import HomeContainer from './containers/HomeContainer'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
	render(){
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
					// <Route exact path="/" component={MainContainer} />
					// <Route path="/allocate" component={AllocateContainer} />
					// <Route path="/admin" component={AdminContainer} />
		return (
			<Router>
				<div>
					<h1>Hospital Rep Allocation System</h1>
					<Route exact path="/" component={HomeContainer} />
				</div>
			</Router>
		);
	}
}


			

export default App;