import React from "react";
import {differenceInDays} from "date-fns";
import {objLoop2} from "../init/global";
import {Containerion} from "../init/project";
import {flow} from "lodash";

import { Container } from "semantic-ui-react";
import ReactHighcharts from "react-highcharts";

const getProps=props=>{
	const {ideas}=props;
	const scopeObj = {
		"1 to 7 days": 7,
		"8 to 30 days": 30,
		"31 to 60 days": 60,
		"61 to 120 days": 120,
		"over 120 days": 999999
	};
	const patchSpent=arr=>arr.map(ele=>{
		const completed = ele.DateCompleted || (new Date());
		const DateSpent = differenceInDays(completed, ele.Created);
		return Object.assign({},ele, {DateSpent} );
	});
	const toDateSpent=arr=> arr.filter(e => e.DateSpent >= 0).map(e => e.DateSpent);
	const toScopeName=arr=>arr.map(ele=>{
		const scopeKeys=Object.keys(scopeObj);
		const scopeValues=Object.values(scopeObj);
		const getScope = num => {
			const index = scopeValues.reduce((times, limit) => times + (num > limit), 0);
			const scope = scopeKeys[index];
			return scope;
		};
		return getScope(ele);
	});
	const countScope=arr=>{
		const scopeInit = objLoop2(scopeObj, (([key, value]) => 0));
		return arr.reduce((self, scope) => {
			const times=self[scope] + 1;
			return {...self,[scope]: times};
		} , scopeInit);
	};
	const toData=obj=>Object.entries(obj).map(([name,y])=>({name,y}));
	const data= flow(patchSpent,toDateSpent,toScopeName,countScope,toData)(ideas);
	const config={
		credits: false,
		chart: {
			type: "column",
			height: 300,
			width: 380,
			backgroundColor:null,
		},
		title: {text: ""},
		// subtitle: { text: ""},
		xAxis: {type: "category"},
		yAxis: {
			title: {text: "Ideas"}
		},
		legend: {enabled: false },
 		"series": [
			{"name": "Ideas",  data }
		],
	};
	return {config};
};
const Histo=props=>{
	const {config}=getProps(props);
	return (
		<Containerion>
			<div style={{height:"3rem"}}><span style={{fontSize:"2rem"}}>Time Spent to Complete</span></div><hr/>
			<ReactHighcharts {...{config}}/>
		</Containerion>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Histo;