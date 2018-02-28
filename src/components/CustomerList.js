import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
import { Component } from 'react';
class _Component extends Component {
	componentDidMount() {
  	}
	render(){
  	const {customers,tableHeader,UI}=this.props;

  	// if(loading!=='done') return <div></div>
  	// console.log('data',data);
  	// console.log('customers',customers);
  	// console.log('UI is :',UI)
  			
	return (
		<div>
			{customers.length&&customers.map((ele,th)=>
				<div key={th}>{ele.GlobalCustName}</div>
			)}
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