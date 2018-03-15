import React from "react";
import { Message,Button } from 'semantic-ui-react'
import { Component } from 'react';
class Allocate extends Component {
	componentDidMount() {
  	}
	render(){
  	const {pageView,data,status:{loading,finished}}=this.props;
  	if(pageView!=='allocate') return <div></div>
  	if(!finished) return <div>Loading</div>

	return (
		<div>
		Allocate
		</div>
	);
  	
  }
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Allocate;