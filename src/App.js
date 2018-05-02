import { updateUI,smart } from './Actions.js'
import React, { Component } from "react";
import "react-dom";
import OrdersContainer from './containers/OrdersContainer'
import OfficesContainer from './containers/OfficesContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import BasicExample from './components/BasicExample';

class App extends Component {
 
	render(){
			// ${wraperCss}
			// grid-template-columns: 1fr 6em;
			// @media screen and (min-width: 800px) {
				// grid-template-columns: 1fr 10em;
  			// }
				// <TodosContainer/>
				// <BasicExample/>
				// <h1>Todo Demo</h1>
    			// <TodosContainer/>
		return (
			<Router>
			    <div>
				<h1>Business Card</h1>
				<ul>
					<li>
					  <Link to="/">Home</Link>
					</li>
					<li>
					  <Link to="/about">About</Link>
					</li>
					<li>
					  <Link to="/order">Order</Link>
					</li>
					<li>
					  <Link to="/office">Office</Link>
					</li>
				</ul>
				<hr />

				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/order" component={OrdersContainer} />
				<Route path="/office" component={OfficesContainer} />
			    </div>
			</Router>
			
		);
	}
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

export default App