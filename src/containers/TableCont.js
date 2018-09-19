import { connect } from "react-redux";
import { updateUI } from "../Actions.js";
import Table from "../components/Table";
import {omit} from "lodash";
import React, { Component } from "react";

const contName="TableCont";
class TableCont extends Component {
	componentDidMount(){}
	
	render(){
		const rest= omit(this.props,[""]);
        
		return <Table {...rest}/>;
	}
}

const mapStateToProps = (state,{name}) => {
	const {ideas}=state;
	const UI=state.localUI[contName] || {};
	return {ideas};
};
const mapDispatchToProps = (dispatch) => {
	const dispatchUI=cmd=>dispatch(updateUI({...cmd,contName}));
	return {
		updateUI:cmd=>dispatchUI({...cmd,contName}),
		// addMessage:text=>dispatch(addMessage(text)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TableCont);