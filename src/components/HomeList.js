import React from "react";
// import PropTypes from "prop-types";
import Pagination from './Pagination';
import Table from "./MyTable";
import {pick} from "lodash";
import { Button } from 'semantic-ui-react'

const getProps=props=>{
	const {UI,updateUI,sbus=[],reps,hospitals,fetchRep,fetchAllocation,selectReps}=props;
	const sbuCode=id=>sbus.filter(ele=>~~ ele.sbuId=== ~~ id)[0].sbuCode;
	// console.log(sbuCode("1258"))
	const repMatch={repId:"Rep ID",globalEmpNbr:"Global Empployee Number",globalEmpName:"Global Employee Name",repLocalName:"Local Employee Name",sbuId:"SBU Code",SBU:"SBU",countryCode:"Country",managerEmailId:"Email"}
	const data_raw=(function() {
		const repAttrs=[...Object.keys(repMatch),"selected"];
		// if(reps) return reps.map(ele=>({...ele})).map(ele=>pick(ele,repAttrs));
		if(reps) return reps.map(ele=>({...ele,SBU:sbuCode(ele.sbuId)})).map(ele=>pick(ele,repAttrs));
	})();
	const clickRow=row=>{
		const repId=row.filter(([key,v])=>key==='repId').map(([key,v])=>v)[0]
		selectReps(repId);
		// fetchRep({repId:[59,61,63]});
	}
	const showHospitals=data=>{
		const repId=data.filter(ele=>ele.selected).map(ele=>ele.repId);
		fetchAllocation({repId});
	}
  	const {page,entries}=UI;
	const config={
		head:{
			match:repMatch, 
			style:{textAlign: "center"}
		},
		body:{
			page,entries,
			row:{
				rowAttr:({selected})=>({active:!selected}),
				exclude:"selected",
				onClick:clickRow,
			},
			cell:{
				style:{textAlign: "center"}
			}
		}
	}
	const data=data_raw;
	const title= reps ? 'Representative' : 'Hospitals';

	const Entries=()=>{
		return (
			<div>
				Entries 
	 			<select value={UI.entries} onChange={e=>updateUI({page:1,entries:e.target.value})}>
	 				<option>10</option>
	 				<option>15</option>
	 				<option>25</option>
	 				<option>50</option>
	 			</select>
			</div>
			)
	}
	return {title,data,config,Entries,showHospitals}
}
const HomeList=props=>{
  	const {UI,updateUI}=props;
  	const {title,data,config,Entries,showHospitals}=getProps(props);
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	return (
		<div> 
			<h3>{title}</h3>
			<Entries/><br/><br/>
			<Pagination {...{data,UI,updateUI}}/> <Button color="blue" onClick={()=>showHospitals(data)}>Show Hospitals For Selected</Button><br/>
			<Table {...{data,config}} />
			<Pagination {...{data,UI,updateUI}}/><br/>
		</div>
	);
}
export default HomeList