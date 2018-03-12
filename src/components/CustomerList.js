import React from "react";
import {cloneDeep as clone} from "lodash";
// import PropTypes from "prop-types";
import { Pagination as PaginationUI,Table } from 'semantic-ui-react'
import { Component } from 'react';
class _Component extends Component {
	componentDidMount() {
		const updateUI=this.props.updateUI;
		const page=this.props.UI.page || 1;
		updateUI({page});
	}
	fetchCust(data){
		const {pickedSbu:sbu}=this.props;
		const {GlobalEmpNbr:globalEmpNbr}=data;
		this.props.fetchCust({method:'contact_cust',sbu,globalEmpNbr})
		// contact_cust
	}
	render(){
  	const {selectCust,contact,customers,UI,updateUI,status:{loading,finished}}=this.props;
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
	const Count=()=>{
		const selected=data.filter(ele=>ele.selected);
		return data.length?
		(<div>Results :{data.length} / Selected :{selected.length}</div>) :
		(<div>No Results</div>)
	};
	const perItems=10;
	const dataShow=(function(){
		const start=perItems*(UI.page-1);
		const end=perItems*(UI.page)-1;
		return data.slice(start,end);
	})();
	const Pagination=()=>{
		const attributes={
			totalPages:~~(data.length/perItems)+1,
			defaultActivePage:UI.page,
			onPageChange:(_,d)=>updateUI({page:d.activePage})
		};
		return <PaginationUI {...attributes}/>
	}
  	const header=(()=>
		dataKey.map(title=> <Table.HeaderCell style={tdStyle} key={title}>{headerMatch[title]}</Table.HeaderCell>)
  	)();
  	const body=(()=>
  		dataShow.map((customer,index)=>
			<Table.Row key={index} onClick={()=>onClickCell(customer)} active={!customer.selected}>
			{dataKey.map(key=>
				<Table.Cell style={tdStyle} key={key}> {customer[key]}</Table.Cell>
			)}
			</Table.Row>
		)
	)();
	return (
		<div>
		<h1>Customer List</h1>
		<Count/>
		<Pagination/><br/>
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
		<Pagination/>
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