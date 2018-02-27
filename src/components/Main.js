import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
import { Component } from 'react';
class _Component extends Component {
	componentDidMount() {
		this.props.fetch1()
  	}
  	// onEnter(e){
		// const isEnter=e.keyCode===13;
		// const text=e.target.value;
	// };
	searchMethod(method){
		const {sbus,countries}=this.props.data
		const sbu=this.refs.sbu.value;
		const country=this.refs.country.value;
		if(method==='contactShow') return this.props.updateUI({contact:true});
		this.props.fetch2({sbu,country,method});
	}
	render(){
  	const {data,loading,UI}=this.props;

  	if(loading!=='done') return <div></div>
  	console.log('data',data);

  	const sbuAttr=ele=>({
  		key:ele.SbuID,
  		value:ele.SbuID
  	});
  	const countryAttr=ele=>({
  		key:ele.countryCode,
  		value:ele.countryCode
  	});
  	//
	return (
		<div>
			<select ref="sbu">
			 	{data.sbus.map(ele=>
			 		<option {...sbuAttr(ele)}>{ele.SbuName}</option>
			 	)}
			</select><br/>
			<select ref="country">
			 	{data.countries.map(ele=>
			 		<option {...countryAttr(ele)}>{ele.countryName}</option>
			 	)}
			</select>
			<div className="searchMethod">
			Search By
				<div><button onClick={()=>this.searchMethod("contactShow")}>Cook Contact</button></div>
				<div><button onClick={()=>this.searchMethod("customer")}>Customer</button></div>
				<div><button onClick={()=>this.searchMethod("unassigned")}>Unassigned Customer</button></div>
			</div>
			<br/>
			<div style={{display: UI.contact? 'initial' : 'none'}}>
				<p>Cook Contact With</p>
				<button onClick={()=>this.searchMethod("contact")}>Primary Contact</button><br/>
				<button>Clinical Specialist</button><br/>
				<button>Corporate Account Manager</button><br/>
			</div>
		</div>
	);
  	
  }
}
// _Component.propTypes = {
	// text: PropTypes.string,
	// done: PropTypes.bool,
	// createdAt: PropTypes.string
// };
export default _Component;