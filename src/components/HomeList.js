import React from "react";
// import PropTypes from "prop-types";
// import { Message,Button } from 'semantic-ui-react'
import Table from "./MyTable";
import {pick} from "lodash";

const getProps=props=>{
	const {reps,hospitals}=props;
	const repMatch={repId:"Rep ID",globalEmpNbr:"Global Empployee Number",globalEmpName:"Global Employee Name",repLocalName:"Local Employee Name",sbuId:"SBU Code",role:"SBU",countryCode:"Country",managerEmailId:"Email"}
	const data_raw=(function() {
		const repAttrs=Object.keys(repMatch);
		if(reps) return reps.map(ele=>pick(ele,repAttrs));
	})();
	console.log(data_raw);
	const config={
		head:{
			match:{}
		},
		body:{
			row:{},
			cell:{}
		}
	}
	const data=data_raw;
	const title= reps ? 'Representative' : 'Hospitals';

	return {title,data,config}
}
const Home=props=>{
  	// const {reps}=props;
  	const {title,data,config}=getProps(props);
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	console.log(data[0]);
	return (
		<div> 
			<h3>{title}</h3>
			<Table {...{data,config}} />
		</div>
	);
}
export default Home