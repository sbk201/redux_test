import { connect } from "react-redux";
import { updateUI } from "../Actions.js";
import Gague from "../components/Gague";
import {omit} from "lodash";
import React, { Component } from "react";

const contName="GagueCont";
class GagueCont extends Component {
	componentDidMount(){}
	render(){
		const rest= omit(this.props,[""]);
		return <Gague {...rest}/>;
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
)(GagueCont);