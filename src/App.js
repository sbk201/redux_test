import React, { Component } from "react";
import "react-dom";
import HomeConta from './containers/HomeConta'
import SignInConta from './containers/SignInConta'
import { BrowserRouter as Router, Route } from "react-router-dom";

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
					<h1>FireBase testing</h1>
					<Route exact path="/" component={HomeConta} />
					<Route path="/signIn" component={SignInConta} />
				</div>
			</Router>
		);
	}
}


			

export default App;