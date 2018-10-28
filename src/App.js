import React, { Component } from "react";
import "react-dom";
import HomeCont from './containers/HomeCont'
import SignInCont from './containers/SignInCont'
import AdminCont from './containers/AdminCont'
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
					<Route exact path="/" component={HomeCont} />
					<Route path="/signIn" component={SignInCont} />
					<Route path="/admin" component={AdminCont} />
				</div>
			</Router>
		);
	}
}


			

export default App;