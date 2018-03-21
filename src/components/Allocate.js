import React from "react";
import { Component } from 'react';
import { mergeClone } from '../init/global';
import { Segment,Button,Modal,Grid,Input,Icon,Label,Message } from 'semantic-ui-react'
class Allocate extends Component {
	componentDidMount() {
		this.props.updateUI({warning:false,confirm:false});
  	}
	render(){
	  	const {pageView,employee,customers,selectEmp,shareObj,UI,updateUI,updateShare}=this.props;
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
		const isHide=bool=>bool&&{style:{display:'none'}};
		const selectedEmp=employee.filter(ele=>ele.selected);
		const messageShow=(function(){
			const messageStyle={style:
				{display: UI.warning ? '' : 'none',
				textAlign:'center'},
			}
			const warning= (<Message warning {...messageStyle}> <p>{UI.message}</p> </Message>);
			const confirmBtn=(<Button content="confirm" style={{width:"100%"}}/>);
			if(UI.confirm) return confirmBtn;
			if(UI.warning) return warning;
		})();
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
			    	{selectedEmp.map((ele,i)=>{
			    		const share=shareObj[ele.GlobalEmpNbr] || "";
			    		const attrs={
			    			value:share,
			    			onChange: e=>updateShare({e,ele,theShareObj:shareObj}),
			    		}
			    		const employeeGrid=
			    		(<Grid.Row key={i}>
			    			<Grid.Column width={4}><Icon link name='cancel' onClick={()=>selectEmp(ele.GlobalEmpNbr)}/>{ele.GlobalEmpName}</Grid.Column>
			    			<Grid.Column width={12}>
			    				<Input labelPosition='right' type='text'>
			    					<Label basic>%</Label> <input {...attrs}/> 
		    				 	</Input>
			    			</Grid.Column>
			    		</Grid.Row>)
			    		return employeeGrid
		    		})}
		    		<Grid.Row>
		    			<Grid.Column width={4}></Grid.Column>
		    			<Grid.Column width={8}>
		    				{messageShow}
  						</Grid.Column>
		    			<Grid.Column width={4}></Grid.Column>
		    		</Grid.Row>
				</Grid>
			</Segment>
			</div>
		);
  	
	}
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Allocate;