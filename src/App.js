import { connect } from 'react-redux'
import { smart } from './Actions.js'
import React, { Component } from "react";
import "react-dom";
import TodosContainer from './containers/TodosContainer'
import UsersContainer from './containers/UsersContainer'
import LoginContainer from './containers/LoginContainer'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
				// <h1>Todo Demo</h1>
    			// <TodosContainer/>
		return (
	<ErrorBoundary><Router>
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
				<li>
				  <Link to="/login">Login</Link>
				</li>
			</ul>
			<hr />
	
			<Route exact path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/login" component={LoginContainer} />
			<Route path="/todos" component={TodosContainer} />
			<Route path="/user" component={UsersContainer} />
		    </div>
		</Router></ErrorBoundary>
			
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.error(error)
    console.log("______info______")
    console.error(info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}