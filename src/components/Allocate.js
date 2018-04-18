import React from "react";
import { Component } from 'react';
// import { mergeClone } from '../init/global';
import { Segment,Button,Grid,Input,Icon,Label,Message } from 'semantic-ui-react'
class Allocate extends Component {
	getProps(props){
		const {employee,selectEmp,checkShare,pickedSbu,customers,editShare}=props;
		const employeeList=employee.map((ele,i)=>{
			const attr={
				content:ele.GlobalEmpName,
				style:{width:"47%",margin: "0.5em 1%",float:'left'},
				onClick:()=>selectEmp(ele.GlobalEmpNbr),
				key:i,active:ele.selected
			}
			return <Button {...attr}/>
		})
		const selectedEmp=employee.filter(ele=>ele.selected);
		const employeeGrid=(emp,i)=>{
			const {GlobalEmpNbr,GlobalEmpName}=emp;
			const attrs={
    			value:emp.value,
    			onChange: e=>{
    				const value=e.target.value|0;
    				const {GlobalEmpNbr}=emp;
    				checkShare({GlobalEmpNbr,value})
    			},
    		}
    		const grid=(
				<Segment key={i} style={{flexGrow:0}}>
					<span>
						<Icon link name='cancel' onClick={()=>selectEmp(GlobalEmpNbr)}/>{GlobalEmpName}
					</span>
    				<Input labelPosition='right' type='text' style={{float:'right'}}>
    					<Label basic>%</Label> <input {...attrs}/> 
				 	</Input>
				</Segment> )
    		return grid
		}
		const shareList=selectedEmp.map(employeeGrid);
		const totalShare=(function() {
			return selectedEmp.map(ele=>ele.value)
			.reduce((acc,self)=>~~acc + ~~self , 0);
		})();
		const messageShow=(function(){
			const messageStyle={style: {textAlign:'center'}}
			const confirm= totalShare===100;
			const message= (<Message warning {...messageStyle}> <p>Total is {totalShare}%,it must be 100%</p> </Message>);
			const confirmBtn=(<Button content="Submit" style={{width:"100%"}} onClick={()=>editShare({customers,selectedEmp,pickedSbu})}/>);
			return confirm? confirmBtn : message ;
		})();
		const customerList=customers.map((ele,i)=>
			<Grid.Row key={i}><Grid.Column>{ele.GlobalCustName} ({ele.globalCustNbr})</Grid.Column></Grid.Row>);
		return  {...props,customerList,employeeList,selectedEmp,shareList,totalShare,messageShow}
	}
	render(){
	  	const {pageView,customerList,employeeList,shareList,messageShow}=this.getProps(this.props);
	  	if(pageView!=='allocate') return <div></div>
		const isHide=bool=>bool&&{style:{display:'none'}};
		return (
			<div>
			<h1>Allocate Customer</h1><hr/>
			<Segment inverted color="blue" size="large">
	  			<h2>Customers list</h2>
			    <Grid>
			    	{customerList}
				</Grid>
			</Segment>
			<Segment inverted color="blue" size="large">
	  			<h2>Employee list</h2><hr/>
			    <Grid columns={2} divided>
			    	<Grid.Row stretched>
						<Grid.Column width={8}>
							<h3>Select Employee</h3>
							<div style={{display:'block'}}>
								{employeeList}
							</div>
						</Grid.Column>
						<Grid.Column width={8}>
							<h3 style={{flexGrow:0}}>Employee Share</h3>
						  	{shareList}
		    				<div style={{height:"4em"}}>{messageShow}</div>
	    				</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
			</div>
		);
  	
	}
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Allocate;
