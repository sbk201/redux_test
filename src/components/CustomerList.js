import React from "react";
import PropTypes from "prop-types";
import { Button,Pagination as PaginationUI } from 'semantic-ui-react'
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
	const perItems=10;
	const Pagination=()=>{
		const attr={
			totalPages:Math.ceil(dataFilter.length/perItems),
			defaultActivePage:UI.page||1,
			onPageChange:(_,d)=>updateUI({page:d.activePage})
		};
		return <PaginationUI {...attr}/>
	}
  	const tableParams=(function(){
		const dataShow=(function(){
			const start=perItems*(UI.page-1);
			const end=perItems*(UI.page)-1;
			return dataFilter.slice(start,end);
		})();
		const fetchCust_=(data)=>{
			const {pickedSbu:sbu}=props;
			const {globalEmpNbr}=data;
			fetchCust({method:'contact_cust',sbu,globalEmpNbr})
		}
	  	const onClickRow=(param)=> {
	  		method==='contact' ?
	  		fetchCust_(param) : selectCust(param.globalCustNbr);
	  	}
		const dataKey=(function(){
			const obj=data[0];
			const {selected,...rest}=obj;
			const keys=Object.keys(rest);
			return keys
		})();
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
  		const style={textAlign:'center',border: '1px black solid'}
  		const param={
  			name:'customer',
	  		headObj:{
	  			array:dataKey, style,
				contentFn:ele=>headerMatch[ele],
	  		},
	  		bodyObj:{
	  			array:dataShow, style,
	  			clickFn:onClickRow
	  		}
	  	}
		return param
  	})();
	const setKeyword=e=>{
		const keyword=e.target.value;
		updateUI({keyword,page:1});
	};	
	return {setKeyword,tableParams,Count,Pagination}
}
const CustomerList=props=>{
	const {nextView}=props;
  	const {setKeyword,tableParams,Count,Pagination}=getProps(props);
	return (
		<div>
			<h1>Customer List</h1>
			<hr/>
			<Count/>
			<Pagination/><br/>
			Filter <input onChange={setKeyword}/><br/>
			<Button content="Submit" color="blue" onClick={()=>nextView('allocate')}/>
			<MyTable {...tableParams}/>
			<Pagination/>
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