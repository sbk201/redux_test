import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
import { Component } from 'react';
class _Component extends Component {
	componentDidMount() {}
	render(){
  	const {customers,UI,status:{loading,finished}}=this.props;
  	if(!finished) return <div></div>;
  	if(customers.length===0) return <div>No Result</div>;
  	// if (!customers.length||!UI) return <div></div>;
  	const keys=Object.keys(customers[0]);
  	const method= UI&&UI.method;
	const headerMatch={
		unassigned :{
		  GlobalCustName:'Customer Number',
		  globalCustNbr:'Customer Name'
		} ,
		customer:{
		  GlobalCustName:'Global Customer Name',
		  globalCustNbr:'Global Customer Nbr',
		  custName:'Local Customer Name',
		  localCustNbr:'Local Customer Nbr'
		},
		contact:{
		  GlobalEmpName:'Global Employee Name',
		  GlobalEmpNbr:'Global Employee Number'
		}
	}[method];
  	// if(loading!=='done') return <div></div>
  	// console.log('data',data);
  	// console.log('UI is :',UI)
  	const tdStyle={textAlign:'center',border: '1px black solid'};
  	const header=(()=>
		keys.map(title=> <th style={tdStyle} key={title}>{headerMatch[title]}</th>)
  	)();
  	const body=(()=>
  		customers.map((customer,index)=>
			<tr key={index}>
			{keys.map(key=>
				<td style={tdStyle} key={key}> {customer[key]} </td>
			)}
			</tr>
		)
	)();
	const Count=()=>{
		return customers.length?
		(<div>Results :{customers.length}</div>) :
		(<div>No Results</div>)};
	return (
		<div>
		<Count/>
			<table>
				<thead><tr>
					{header}		
				</tr></thead>
				<tbody>
					{body}
				</tbody>
			</table>
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