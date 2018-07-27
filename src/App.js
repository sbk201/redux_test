import { connect } from "react-redux";
import { updateUI,smart } from "./Actions.js";
import React, { Component } from "react";
import "react-dom";
import TodosContainer from "./containers/TodosContainer";
import BillboardChart from "react-billboardjs";
import "react-billboardjs/lib/billboard.css";

const mapStateToProps = (state) => {
	return { };
};
const mapDispatchToProps = (dispatch) => {
	return {
		// fetch:()=>dispatch(smart.getMessage()),
	};
};
const CHART_DATA = {
  columns: [
    ["data1", 30, 20, 50, 40, 60, 50],
    ["data2", 200, 130, 90, 240, 130, 220],
    ["data3", 300, 200, 160, 400, 250, 250]
  ],
  type: "line"
};
class App extends Component {
 
	componentDidMount() {
	// this.props.fetch();

	}
	render(){
		// ${wraperCss}
		// grid-template-columns: 1fr 6em;
		// @media screen and (min-width: 800px) {
		// grid-template-columns: 1fr 10em;
		// }
		// <TodosContainer/>
		return (
			<div>
				<h1>D3 Demo</h1>
				<BillboardChart data={CHART_DATA} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);