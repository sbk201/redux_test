import { connect } from "react-redux";
import { smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import Donut from "./containers/DonutCont";
import Histo from "./containers/HistoCont";
import Gauge from "./containers/GaugeCont";
import Table from "./containers/TableCont";
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
					<div className="col-md-6"><Donut name="Status"/></div>					
					<div className="col-md-6"><Donut name="Area"/></div>					
					<div className="col-md-6"><Histo/></div>
					<div className="col-md-6"><Gauge/></div>
					<div className="col-md-12"><Table/></div>
				</div>

			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);