import { connect } from "react-redux";
import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import DonutCont from "./containers/DonutCont";
import HistoCont from "./containers/HistoCont";
import dataImport from "./data";

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetch:()=>dispatch(smart.getIdeas()),
	};
}
window.theData=dataImport;
class App extends Component {
 
	componentDidMount() {
		this.props.fetch();
	}
				// <DonutCont name="Status"/>
				// <DonutCont name="Area"/>
	render(){
		return (
			<div>
				<h1>D3 Demo</h1>
				<HistoCont/>

			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);