import React from "react";
import { Component } from 'react';
class Allocate extends Component {
	componentDidMount() {
  	}
	render(){
  	const {pageView,employee,status:{loading,finished}}=this.props;
  	if(pageView!=='allocate') return <div></div>
  		

	return (
		<div>
		Allocate
		{employee.map((ele,i)=><div key={i}>{ele.GlobalEmpName}</div>)}
		</div>
	);
  	
  }
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Allocate;