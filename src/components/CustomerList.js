import React from "react";
import {cloneDeep as clone} from "lodash";
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
  	const {selectCust,contact,customers,UI,status:{loading,finished}}=this.props;
  	if(!finished) return <div></div>;
  	const method= UI&&UI.method;
	const data= method==='contact' ? contact : customers;
	const dataKey=(function(){
		const obj=data[0];
		const {selected,...rest}=clone(obj);
		const keys=Object.keys(rest);
		return keys
	})();
  	if(data.length===0) return <div>No Result</div>;
  			
  	const headerCu={
		  GlobalCustName:'Global Customer Name',
		  globalCustNbr:'Global Customer Nbr',
		  custName:'Local Customer Name',
		  localCustNbr:'Local Customer Nbr'
		};
	const headerMatch={
		unassigned :{
		  GlobalCustName:'Customer Name',
		  globalCustNbr:'Customer Number'
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
  	const onClickCell=(param)=> {
  		method==='contact' ?
  		this.fetchCust(param) : selectCust(param.globalCustNbr);
  	}
  	const header=(()=>
		dataKey.map(title=> <Table.HeaderCell style={tdStyle} key={title}>{headerMatch[title]}</Table.HeaderCell>)
  	)();
  	const body=(()=>
  		data.map((customer,index)=>
			<Table.Row key={index} onClick={()=>onClickCell(customer)} active={!customer.selected}>
			{dataKey.map(key=>
				<Table.Cell style={tdStyle} key={key}> {customer[key]}</Table.Cell>
			)}
			</Table.Row>
		)
	)();

	const Count=()=>{
		return data.length?
		(<div>Results :{data.length}</div>) :
		(<div>No Results</div>)
	};
	return (
		<div>
		<h1>Customer List</h1>
		<Count/>
		<Table color="blue" celled selectable inverted>
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