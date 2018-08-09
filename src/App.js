import { connect } from "react-redux";
import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import DonutCont from "./containers/DonutCont";
import HistoCont from "./containers/HistoCont";
import GagueCont from "./containers/GagueCont";
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
	render(){
		return (
			<div>
				<h1>D3 Demo</h1>
				<div className="container-fluid row">
					<div className="col-md-6"><DonutCont name="Status"/></div>					
					<div className="col-md-6"><DonutCont name="Area"/></div>					
					<div className="col-md-6"><HistoCont/></div>					
					<div className="col-md-6"><GagueCont/></div>					
				</div>

			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);