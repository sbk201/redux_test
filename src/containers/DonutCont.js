import { connect } from "react-redux";
import { updateUI } from "../Actions.js";
import Donut from "../components/Donut";
import {omit} from "lodash";
import React, { Component } from "react";

const contName="DonutCont";
class DonutCont extends Component {
	componentDidMount(){}
	shouldComponentUpdate(next){
    const isArea= this.props.name==='Area';
    const filterChanged=this.props.filter1!==next.filter1;
    if(!isArea && filterChanged) return false
    return true
	}
	render(){
		const isArea= this.props.name==='Area';
		const rest= isArea ? this.props : omit(this.props,["filter1"]);
        
		return <Donut {...rest}/>;
	}
}

const mapStateToProps = (state,{name}) => {
	const {ideas}=state;
	const UI=state.localUI[contName] || {};
	const {filter1}=UI;
	return {ideas,name,filter1};
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
)(DonutCont);