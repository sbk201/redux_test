import React from "react";
import { Component } from 'react';
import { Segment,Button,Modal,Grid,Input,Icon,Label } from 'semantic-ui-react'
class Allocate extends Component {
	componentDidMount() {
  	}
	render(){
	  	const {pageView,employee,customers,selectEmp,UI,updateUI}=this.props;
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
			<Modal trigger={<Button>Select</Button>} style={{margin:'auto',marginTop:0}}>
			<Modal.Header>Select Employees</Modal.Header>
			<Modal.Actions>
				{employeeList}
			</Modal.Actions>
			</Modal>
		)
		// const isHide=bool=>bool&&{style:{display:'none'}};
		const selectedEmp=employee.filter(ele=>ele.selected);
		const onInput=(e,emp)=>{
			const value=e.target.value;
			const {GlobalEmpNbr}=emp;
			// updateUI()
		}
		return (
			<div>
			<h1>Allocate Customer</h1>
			<Segment inverted color="blue" size="large">
	  			<h2>Customers list</h2>
			    <Grid>
			    	{customers.map((ele,i)=><Grid.Row key={i}><Grid.Column>{ele.GlobalCustName}</Grid.Column></Grid.Row>)}
				</Grid>
			</Segment>
			<Segment inverted color="blue" size="large">
	  			<h2>Employee list</h2>
	  			<ModalBtn/><br/><br/><br/>
			    <Grid>
			    	{selectedEmp.map((ele,i)=>
			    		<Grid.Row key={i}>
			    			<Grid.Column width={6}><Icon link name='cancel' onClick={()=>selectEmp(ele.GlobalEmpNbr)}/>{ele.GlobalEmpName}</Grid.Column>
			    			<Grid.Column width={10}>
			    				<Input labelPosition='right' type='text'>
			    					<Label basic>%</Label> <input onChange={e=>onInput(e,ele)}/> 
		    				 	</Input>
			    			</Grid.Column>
			    		</Grid.Row>)
			    	}
				</Grid>
			</Segment>
			</div>
		);
  	
	}
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Allocate;