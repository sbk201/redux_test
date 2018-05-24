import React from "react";
import PropTypes from "prop-types";
import { Button} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import {toObj} from "../init/global"; 
import Pagination from "./Pagination";
import MyTable from './MyTable';
const getProps=props=>{
	const {updateUI,selectCust,fetchCust}=props
	const {data,UI}=props;
	const method=UI.method;
	const Count=()=>{
		const selected=data.filter(ele=>ele.selected);
		return (<div>Results :{data.length} / Selected :{selected.length}</div>);
	};
	const dataFilter=(function (data,_keyword){
		if(!_keyword) return data;
		const keyword=new RegExp(_keyword,"i");
		const match=keyword=>ele=> {
			const keys=["globalCustName", "globalCustNbr", "custName", "localCustNbr"];
			return keys.some(key=>ele[key] && ele[key].search(keyword)>=0)
		}
		const filtered=data.filter(match(keyword));
		return filtered;
	})(data,UI.keyword);
	const headerMatch=(function(){
		const common={
		  globalCustName:'Global Customer Name',
		  globalCustNbr:'Global Customer Nbr',
		  custName:'Local Customer Name',
		  localCustNbr:'Local Customer Nbr'
		};
		const head={
			unassigned :{
			  globalCustName:'Customer Name',
			  globalCustNbr:'Customer Number'
			} ,
			customer:common,
			contact_cust:common,
			contact:{
			  globalEmpName:'Global Employee Name',
			  globalEmpNbr:'Global Employee Number'
			},
		}[method];
		return head
	})();
	const setKeyword=e=>{
		const keyword=e.target.value;
		updateUI({keyword,page:1});
	};
	const dataConfig=(function() {
		const fetchCust_=(data)=>{
			const {pickedSbu:sbu}=props;
			const {globalEmpNbr}=data;
			fetchCust({method:'contact_cust',sbu,globalEmpNbr})
		}
	  	const onClickRow=(param_)=> {
	  		const param= toObj(param_);
	  		method==='contact' ?
	  		fetchCust_(param) : selectCust(param.globalCustNbr);
	  	}
	  	const {page,entries}=UI;
	  	const tableConfig={
			head: {
				match:headerMatch,
				style:{textAlign: "center"}
			},
			body:{
				page,entries,
				row:{
					rowAttr:({selected})=>({active:!selected}),
					exclude:"selected",
					onClick:(param)=>onClickRow(param),
				},
				cell:{
					style:{textAlign: "center"}
				}
			}
		}
		return {table:tableConfig}
	})();
	return {setKeyword,Count,data:dataFilter,dataConfig}
}
const CustomerList=props=>{
  	const {setKeyword,Count,data,dataConfig}=getProps(props);
  	const {UI,updateUI}=props;

	return (
		<div>
			<h1>Customer List</h1>
			<hr/>
			<Count/>
			Filter <input onChange={setKeyword}/> <br/><br/>
 			<Pagination {...{data,UI,updateUI}}/> <Link to="/allocate"><Button content="Submit" color="blue"/></Link><br/>
			<MyTable {...{data,config:dataConfig.table}}/>
			<Pagination {...{data,UI,updateUI}}/><br/>
		</div>
	);
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/

CustomerList.propTypes ={
  UI: PropTypes.shape({
    method: PropTypes.string,
    page: PropTypes.number,
    status: PropTypes.string
  }),
  contact: PropTypes.arrayOf(PropTypes.shape({
    globalEmpName: PropTypes.string.isRequired,
    globalEmpNbr: PropTypes.string.isRequired
  }).isRequired),
  customers: PropTypes.arrayOf(PropTypes.shape({
    globalCustName: PropTypes.string.isRequired,
    custName: PropTypes.string,
    globalCustNbr: PropTypes.string.isRequired,
    localCustNbr: PropTypes.string
  }).isRequired)
}
export default CustomerList;