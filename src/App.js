import { connect } from "react-redux";
// import { smart } from "./Actions.js";
import React, { Component, Fragment as Frag} from "react";
import "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UINavbar from "./components/UINavbar"
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
			<Frag>
				<Router>
					<Frag>
						<UINavbar/><br/><br/><br/>
						<Switch>
							<Route exact path="/" component={HomeCont} />
							<Route component={HomeCont} />
						</Switch>
					</Frag>
				</Router>
			</Frag>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);