import React, { Component } from "react";
import "react-dom";
import HomeConta from './containers/HomeConta'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
	render(){
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
					// <Route exact path="/" component={MainConta} />
					// <Route path="/allocate" component={AllocateConta} />
					// <Route path="/admin" component={AdminConta} />
		return (
			<Router>
				<div>
					<h1>FireBase testing</h1>
					<Route exact path="/" component={HomeConta} />
					<Route path="/signIn" component={HomeConta} />
				</div>
			</Router>
		);
	}
}


			

export default App;