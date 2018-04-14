import { connect } from 'react-redux'
import { updateUI,smart } from './Actions.js'
import React, { Component } from "react";
import "react-dom";
import TodosContainer from './containers/TodosContainer'
import UsersContainer from './containers/UsersContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BasicExample from './components/BasicExample';

const mapStateToProps = (state) => {
  return { }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessage:()=>dispatch(smart.message.get()),
  }
}

class App extends Component {
 
  componentDidMount() {
    this.props.fetchMessage();
  }
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
		<ul>
			<li>
			  <Link to="/">Home</Link>
			</li>
			<li>
			  <Link to="/about">About</Link>
			</li>
			<li>
			  <Link to="/todos">Todos</Link>
			</li>
			<li>
			  <Link to="/user">User</Link>
			</li>
		</ul>
		<hr />

		<Route exact path="/" component={Home} />
		<Route path="/about" component={About} />
		<Route path="/todos" component={TodosContainer} />
		<Route path="/user" component={UsersContainer} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)