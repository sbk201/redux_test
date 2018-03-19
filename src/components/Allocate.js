import React from "react";
import { Component } from 'react';
import { List,Segment,Button,Modal } from 'semantic-ui-react'
class Allocate extends Component {
	componentDidMount() {
  	}
	render(){
	  	const {pageView,employee,customers,selectEmp}=this.props;
	  	if(pageView!=='allocate') return <div></div>

		const employeeList=employee.map((ele,i)=>{
			const attr={
				content:ele.GlobalEmpName,
				style:{width: "45%", margin: "0.5em 2%"},
				onClick:()=>selectEmp(ele.GlobalEmpNbr),
				key:i, color:"blue", inverted:true,active:ele.selected
			}
			return <Button {...attr}/>
		})


		const ModalBtn = () => (
			<Modal trigger={<Button>Select Employee</Button>} style={{margin:'auto',marginTop:0}}>
			<Modal.Header>Select Employees</Modal.Header>
			<Modal.Actions>
				{employeeList}
			</Modal.Actions>
			</Modal>
		)
		return (
			<div>
			<h1>Allocate Customer</h1>
			<Segment inverted color="blue">
	  			<h3>Customers list</h3>
			    <List divided inverted>
				    {customers.map((ele,i)=><List.Item key={i}>{ele.GlobalCustName}</List.Item>)}
			    </List>
			</Segment>
			<ModalBtn/>
			</div>
		);
  	
	}
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Allocate;