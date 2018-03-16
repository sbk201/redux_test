import React from "react";
import { Component } from 'react';
import { List,Message,Segment } from 'semantic-ui-react'
class Allocate extends Component {
	componentDidMount() {
  	}
	render(){
  	const {pageView,employee,customers}=this.props;
  	if(pageView!=='allocate') return <div></div>


	return (
		<div>
		<h1>Allocate Customer</h1>
		<Segment inverted color="blue">
  			<h3>Customers list</h3>
		    <List divided inverted>
			    {customers.map(ele=><List.Item>{ele.GlobalCustName}</List.Item>)}
		    </List>
		</Segment>
		{employee.map((ele,i)=><div key={i}>{ele.GlobalEmpName}</div>)}
		</div>
	);
  	
  }
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Allocate;