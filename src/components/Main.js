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
	onChangeSbu(e){
		const id=e.target.value;
	}
	onChangeCountry(e){
		const id=e.target.value;
	}
	searchMethod(e,method){
		const {sbus,countries}=this.props.data
		const sbu=this.refs.sbu.value;
		const country=this.refs.country.value;
		console.log(this.refs.country)
		// const country=
		// http://10.65.1.24/appPortal/customerAllocation/lib/api.php?type=get_unassigned_cust&country=AF&_=1518164820303
		if(method==="unassigned"){
			// console.log(sbus,countries,sbu,country)
			this.props.fetch2({sbu,country});
		}
	}
	render(){
  	const {data,loading}=this.props;

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
			<select onChange={e=>this.onChangeSbu(e)} ref="sbu">
			 	{data.sbus.map(ele=>
			 		<option {...sbuAttr(ele)}>{ele.SbuName}</option>
			 	)}
			</select>
			<div className="searchMethod">
			Search By
				<div><button onClick={(e)=>this.searchMethod(e,"contact")}>Cook Contact</button></div>
				<div><button onClick={(e)=>this.searchMethod(e,"customer")}>Customer</button></div>
				<div><button onClick={(e)=>this.searchMethod(e,"unassigned")}>Unassigned Customer</button></div>
			</div>
			<select onChange={e=>this.onChangeCountry(e)} ref="country">
			 	{data.countries.map(ele=>
			 		<option {...countryAttr(ele)}>{ele.countryName}</option>
			 	)}
			</select>
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