import React from "react";
import { Component } from 'react';
import { mergeClone } from '../init/global';
import { Segment,Button,Grid,Input,Icon,Label,Message } from 'semantic-ui-react'
class Allocate extends Component {
	componentDidMount() {
		this.props.updateUI({warning:false,confirm:false});
  	}
  	componentDidUpdate(){

  	}

	render(){
	  	const {pageView,employee,customers,selectEmp,shareObj,UI,updateUI,updateShare,updateShare2}=this.props;
	  	if(pageView!=='allocate') return <div></div>

		const employeeList=employee.map((ele,i)=>{
			const attr={
				content:ele.GlobalEmpName,
				style:{width:"47%",margin: "0.5em 1%",float:'left'},
				onClick:()=>selectEmp(ele.GlobalEmpNbr),
				key:i,active:ele.selected
			}
			return <Button {...attr}/>
		})
		const isHide=bool=>bool&&{style:{display:'none'}};
		const selectedEmp=employee.filter(ele=>ele.selected);
		const totalShare=(function() {
			return selectedEmp.map(ele=>ele.value)
			.reduce((acc,next)=>~~acc + ~~next , 0);
		})();
		const messageShow=(function(){
			const messageStyle={style:
				{textAlign:'center'},
			}
			// const warning= totalShare!==100;
			const confirm= totalShare===100;
			const message= (<Message warning {...messageStyle}> <p>Total is {totalShare}%,it must be 100%</p> </Message>);
			const confirmBtn=(<Button content="confirm" style={{width:"100%"}}/>);
			return confirm? confirmBtn : message ;
			return <div style={{height:'4em'}}></div>
		})();
		return (
			<div>
			<h1>Allocate Customer</h1><hr/>
			<Segment inverted color="blue" size="large">
	  			<h2>Customers list</h2>
			    <Grid>
			    	{customers.map((ele,i)=><Grid.Row key={i}><Grid.Column>{ele.GlobalCustName}</Grid.Column></Grid.Row>)}
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
						  	{selectedEmp.map((ele,i)=>{
				    		const attrs={
				    			value:ele.value,
				    			onChange: e=>{
				    				const value=e.target.value|0;
				    				const {GlobalEmpNbr}=ele;
				    				updateShare2({GlobalEmpNbr,value})
				    			},
				    		}
				    		const employeeGrid=(
		    				<Segment key={i} style={{flexGrow:0}}>
		    					<span>
		    						<Icon link name='cancel' onClick={()=>selectEmp(ele.GlobalEmpNbr)}/>{ele.GlobalEmpName}
		    					</span>
			    				<Input labelPosition='right' type='text' style={{float:'right'}}>
			    					<Label basic>%</Label> <input {...attrs}/> 
		    				 	</Input>
		    				</Segment> )
				    		return employeeGrid
		    				})}
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
