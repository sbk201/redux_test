import { connect } from "react-redux";
// import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeCont from "./containers/HomeCont";

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		// fetch:()=>dispatch(smart.getIdeas()),
	};
};
class App extends Component {
	componentDidMount() {
		// this.props.fetch();
	}
	render(){
		return (
			<div>
				<Router>
					<div>
						<Switch>
							<Route exact path="/" component={HomeCont} />
							<Route component={HomeCont} />
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