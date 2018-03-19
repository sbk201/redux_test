import React from "react";
import {cloneDeep as clone} from "lodash";
import PropTypes from "prop-types";
import { Button,Pagination as PaginationUI } from 'semantic-ui-react'
import MyTable from './MyTable';
import { Component } from 'react';
class CustomerList extends Component {
	componentDidMount() {
		const updateUI=this.props.updateUI;
		const page=this.props.UI.page || 1;
		updateUI({page});
	}
	fetchCust_(data){
		const {pickedSbu:sbu}=this.props;
		const {GlobalEmpNbr:globalEmpNbr}=data;
		this.props.fetchCust({method:'contact_cust',sbu,globalEmpNbr})
	}
	render(){
  	const {updateUI,selectCust,nextView}=this.props;
  	// const {pageView,contact,customers,UI,status:{loading,finished}}=this.props;
  	const {pageView,contact,customers,UI,status:{finished}}=this.props;
  	if(pageView!=='search') return <div></div>
  	if(!finished) return <div></div>;
  	const method=UI.method;
	const data= method==='contact' ? contact : customers;
  	if(data.length===0) return <div>No Result</div>;
	const dataKey=(function(){
		const obj=data[0];
		const {selected,...rest}=clone(obj);
		const keys=Object.keys(rest);
		return keys
	})();
  			
	const headerMatch=(function(){
		const common={
		  GlobalCustName:'Global Customer Name',
		  globalCustNbr:'Global Customer Nbr',
		  custName:'Local Customer Name',
		  localCustNbr:'Local Customer Nbr'
		};
		const head={
			unassigned :{
			  GlobalCustName:'Customer Name',
			  globalCustNbr:'Customer Number'
			} ,
			customer:common,
			contact_cust:common,
			contact:{
			  GlobalEmpName:'Global Employee Name',
			  GlobalEmpNbr:'Global Employee Number'
			},
		}[method];
		return head
	})();
	
  	const onClickRow=(param)=> {
  		method==='contact' ?
  		this.fetchCust_(param) : selectCust(param.globalCustNbr);
  	}
	const Count=()=>{
		const selected=data.filter(ele=>ele.selected);
		return data.length?
		(<div>Results :{data.length} / Selected :{selected.length}</div>) :
		(<div>No Results</div>)
	};
	const dataFilter=(function (data,_keyword){
		if(!_keyword) return data;
		const keyword=new RegExp(_keyword,"i");
		const match=keyword=>ele=> 
			ele.GlobalCustName.search(keyword)>=0 || ele.custName.search(keyword)>=0;
		const filtered=data.filter(match(keyword));
		return filtered;
	})(data,UI.keyword);
	const perItems=10;
	const Pagination=()=>{
		const attributes={
			totalPages:Math.ceil(dataFilter.length/perItems),
			defaultActivePage:UI.page,
			onPageChange:(_,d)=>updateUI({page:d.activePage})
		};
		return <PaginationUI {...attributes}/>
	}
	const dataShow=(function(dataFilter){
		const start=perItems*(UI.page-1);
		const end=perItems*(UI.page)-1;
		return dataFilter.slice(start,end);
	})(dataFilter);
  	const tableParams=(function(){
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
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/

CustomerList.propTypes ={
  UI: PropTypes.shape({
    method: PropTypes.string,
    page: PropTypes.number,
    status: PropTypes.string
  }),
  contact: PropTypes.arrayOf(PropTypes.shape({
    GlobalEmpName: PropTypes.string.isRequired,
    GlobalEmpNbr: PropTypes.string.isRequired
  }).isRequired),
  customers: PropTypes.arrayOf(PropTypes.shape({
    GlobalCustName: PropTypes.string.isRequired,
    custName: PropTypes.string,
    globalCustNbr: PropTypes.string.isRequired,
    localCustNbr: PropTypes.string
  }).isRequired),
  status: PropTypes.shape({
    finished: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  })
}
export default CustomerList;