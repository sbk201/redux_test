import { connect } from "react-redux";
import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import UIGrids from './components/UIGrids';
import UINavbar from './components/UINavbar';

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetch:()=>dispatch(smart.getIdeas()),
	};
};
class App extends Component {
	componentDidMount() {
		this.props.fetch();
	}
	// <div className="row">
	// <div className="col-xs-6" style={{backgroundColor:"lightblue"}}>Part A</div>					
	// <div className="col-xs-6" style={{backgroundColor:"green"}}>Part B</div>		
	// </div>
	render(){
		return (
			<div>
				<UINavbar/>
				<h1>Main App</h1>
				<UIGrids/>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);