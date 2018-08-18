import { connect } from "react-redux";
import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetch:()=>dispatch(smart.getIdeas()),
	};
}
class App extends Component {
	componentDidMount() {
		this.props.fetch();
	}
	render(){
		return (
			<div>
				<h1>Main App</h1>
				<div className="container-fluid row">
					<div className="col-xs-6" style={{backgroundColor:"lightblue"}}>Part A</div>					
					<div className="col-xs-6" style={{backgroundColor:"green"}}>Part B</div>		
				</div>

			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);