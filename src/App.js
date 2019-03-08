import { connect } from "react-redux";
// import { smart } from "./Actions.js";
import React, { Component, Fragment as Frag} from "react";
import "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UINavbar from "./components/UINavbar"
import HomeCont from "./containers/HomeCont";
import JobsCont from "./containers/JobsCont";
import JobCont from "./containers/JobCont";

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
					<div style={{overflowX:"auto"}}>
						<UINavbar />
						<Switch>
							<Route exact path="/" component={HomeCont} />
							<Route exact path="/simple" component={HomeCont} />
							<Route exact path="/advance" component={HomeCont} />
							<Route exact path="/jobs" component={JobsCont} />
							<Route path="/jobs/:id" component={JobCont} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</Router>
			</Frag>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);