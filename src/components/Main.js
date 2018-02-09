import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
import { Component } from 'react';
class _Component extends Component {
	componentDidMount() {
		this.props.fetch()
  	}
  	// onEnter(e){
		// const isEnter=e.keyCode===13;
		// const text=e.target.value;
	// };
	onChange(e){
		const id=e.target.value;
	}
	searchMethod(e){
		if(e==="unassigned"){
				
		}
	}
	render(){
  	const {data,loading}=this.props;

  	if(loading!=='done') return <div></div>
  	// if(!data.sbus) return <div>No Data</div>

  	// console.log('data',UI,data);

  	// render object after it exist
  	// if(!data.sbus) return <div></div>
  	const selectAttr=ele=>({
  		href:"#"+ele.SbuName,
  		key:ele.SbuID,
  		value:ele.SbuID
  		// onClick: e=>this.onClick(e)
  	});
  	//
	return (
		<div>
			<select onChange={e=>this.onChange(e)}>
			 	{data.sbus.map(ele=>
			 		<option {...selectAttr(ele)}>{ele.SbuName}</option>
			 	)}
			</select>
			<div className="searchMethod">
			Search By
				<div><button onClick={()=>this.searchMethod("contact")}>Cook Contact</button></div>
				<div><button onClick={()=>this.searchMethod("customer")}>Customer</button></div>
				<div><button onClick={()=>this.searchMethod("unassigned")}>Unassigned Customer</button></div>
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