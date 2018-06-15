import React from "react";
// import PropTypes from "prop-types";
import Pagination from './Pagination';
import Table from "./MyTable";
import {pick} from "lodash";
import { Button } from 'semantic-ui-react'

const getProps=props=>{
	const {UI,updateUI,sbus=[],reps,hospitals,fetchRep,fetchHospital,selectReps}=props;
	const sbuCode=id=>{
		return sbus.filter(ele=>~~ ele.sbuId=== ~~ id)[0].sbuCode
	};
	// console.log(sbuCode("1258"))
	const [headMatch,data_raw]=(function() {
		if(UI.show==='rep'){
			const repMatch={repId:"Rep ID",globalEmpNbr:"Global Employee Number",globalEmpName:"Global Employee Name",repLocalName:"Local Employee Name",sbuId:"SBU Code",SBU:"SBU",countryCode:"Country",managerEmailId:"Email"}
			const repAttrs=[...Object.keys(repMatch),"selected"];
			const repData=reps.map(ele=>({...ele,SBU:sbuCode(ele.sbuId)})).map(ele=>pick(ele,repAttrs));
			return [repMatch,repData];
		}
		if(UI.show==='hosp'){
			const hospMatch={hospitalFId:"Falkor ID",hospitalNameInEnglish:"Name",hospitalNameInLocal:"Local Name"
			,addressLine_1:"Address", prefectureName:"Prefecture",city:"City",postCode:"Post Code"}
			const hospAttrs=[...Object.keys(hospMatch),"selected"];
			const hospData=hospitals.map(ele=>pick(ele,hospAttrs));
			return [hospMatch,hospData];
		}
		return [{},[]]
	})();
	const clickRow=row=>{
		const repId=row.filter(([key,v])=>key==='repId').map(([key,v])=>v)[0]
		selectReps(repId);
		// fetchRep({repId:[59,61,63]});
	}
	const showHospitals=data=>{
		const repId=data.filter(ele=>ele.selected).map(ele=>ele.repId);
		fetchHospital({repId});
	}
  	const {page,entries}=UI;
	const config={
		head:{
			match:headMatch, 
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
	const title= UI.show==='rep' ? 'Representative' : 'Hospitals';

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
	return {title,data:data_raw,config,Entries,showHospitals}
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