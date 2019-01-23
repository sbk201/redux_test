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
const NotFound= ()=> <div>404 Not Found</div>
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
							<Route exact path="/simple" component={HomeCont} />
							<Route exact path="/advance" component={HomeCont} />
							<Route component={NotFound} />
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