import { connect } from "react-redux";
// import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import UIGrids from "./components/UIGrids";
import UINavbar from "./components/UINavbar";
import FormFillCont from "./containers/FormFillCont";
import TodoCont from "./containers/TodoCont";
import SignInCont from "./containers/SignInCont";

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		// fetch:()=>dispatch(smart.getIdeas()),
	};
};
const NoMatch=()=><div>404 Page Not Found</div>;
class App extends Component {
	componentDidMount() {
		// this.props.fetch();
	}
	// <UIGrids/>
	render(){
		return (
			<div>
				<Router>
					<div>
						<UINavbar/><br/><br/><br/>
						<Switch>
							<Route exact path="/" component={UIGrids} />
							<Route path="/gallery" component={Gallery} />
							<Route path="/formFill" component={FormFillCont} />
							<Route path="/todo" component={TodoCont} />
							<Route path="/signin" component={SignInCont} />
							<Route component={NoMatch} />
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