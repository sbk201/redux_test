import React from "react";
// import PropTypes from "prop-types";
import { Table } from 'semantic-ui-react'
import { Component } from 'react';
class _Component extends Component {
	componentDidMount() {}
	fetchCust(data){
		const {pickedSbu:sbu}=this.props;
		const {GlobalEmpNbr:globalEmpNbr}=data;
		this.props.fetchCust({method:'contact_cust',sbu,globalEmpNbr})
		// contact_cust
	}
	render(){
  	const {customers,UI,status:{loading,finished}}=this.props;
  	if(!finished) return <div></div>;
  	if(customers.length===0) return <div>No Result</div>;
  	const keys=Object.keys(customers[0]);
  	const method= UI&&UI.method;
  	const headerCu={
		  GlobalCustName:'Global Customer Name',
		  globalCustNbr:'Global Customer Nbr',
		  custName:'Local Customer Name',
		  localCustNbr:'Local Customer Nbr'
		};
	const headerMatch={
		unassigned :{
		  GlobalCustName:'Customer Number',
		  globalCustNbr:'Customer Name'
		} ,
		customer:headerCu,
		contact_cust:headerCu,
		contact:{
		  GlobalEmpName:'Global Employee Name',
		  GlobalEmpNbr:'Global Employee Number'
		},
	}[method];
  	// console.log('data',data);
  	// console.log('UI is :',UI)
  	const tdStyle={textAlign:'center',border: '1px black solid'};

  	const header=(()=>
		keys.map(title=> <Table.HeaderCell style={tdStyle} key={title}>{headerMatch[title]}</Table.HeaderCell>)
  	)();
  	const body=(()=>
  		customers.map((customer,index)=>
			<Table.Row key={index}>
			{keys.map(key=>
				<Table.Cell style={tdStyle} key={key} onClick={()=>this.fetchCust(customer)}> {customer[key]} </Table.Cell>
			)}
			</Table.Row>
		)
	)();

	const Count=()=>{
		return customers.length?
		(<div>Results :{customers.length}</div>) :
		(<div>No Results</div>)};
	return (
		<div>
		<Count/>
		<Table color="blue" inverted>
	        <Table.Header>
	          <Table.Row>
				{header}
	          </Table.Row>
	        </Table.Header>
	        <Table.Body>
				{body}
	        </Table.Body>
    	</Table>
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