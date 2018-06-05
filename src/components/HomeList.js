import React from "react";
// import PropTypes from "prop-types";
// import { Message,Button } from 'semantic-ui-react'
import Table from "./MyTable";
import {pick} from "lodash";

const getProps=props=>{
	const {sbus=[],reps,hospitals,fetchRep,selectReps}=props;
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
	const config={
		head:{
			match:repMatch, 
			style:{textAlign: "center"}
		},
		body:{
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

	return {title,data,config}
}
const HomeList=props=>{
  	// const {reps}=props;
  	const {title,data,config}=getProps(props);
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	return (
		<div> 
			<h3>{title}</h3>
			<Table {...{data,config}} />
		</div>
	);
}
export default HomeList