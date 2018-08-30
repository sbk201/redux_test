import { connect } from "react-redux";
import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UIGrids from "./components/UIGrids";
import UINavbar from "./components/UINavbar";

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetch:()=>dispatch(smart.getIdeas()),
	};
};
const NoMatch=()=><div>404 Page Not Found</div>;
class App extends Component {
	componentDidMount() {
		this.props.fetch();
	}
	// <UIGrids/>
	render(){
		return (
			<div>
				<h1>Main App</h1>
				<Router>
					<div>
						<UINavbar/>
						<Switch>
							<Route exact path="/" component={UIGrids} />
							<Route component={NoMatch} />
							{/*<Route path="/allocate" component={AllocateContainer} />*/}
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);