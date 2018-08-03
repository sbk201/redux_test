import React from "react";
import "react-billboardjs/lib/billboard.css";
import BillboardChart from "react-billboardjs";
import {differenceInDays,format as dateFormat} from "date-fns";
import {statBy,objLoop2} from "../init/global";
import {flow} from "lodash";
import { Select } from "semantic-ui-react";

const getProps=props=>{
	const {ideas,updateUI,UI}=props;
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
	const statSpent=arr=>{
		const scopeInit = objLoop2(scopeObj, (([key, value]) => 0));
		return arr.reduce((self, scope) => {
			const times=self[scope] + 1;
			return Object.assign({},self,{[scope]: times});
		} , scopeInit);
	};
	const toChart=arr=>({columns:arr,type:"bar"});
	const separate=arr=>arr.reduce(([titles,values],[title,value])=>[[...titles,title],[...values,value]],[[],[]]);
	const combine=arr=>[["test",...arr.map(ele=>ele[1])]];
	const data= flow(patchSpent,toDateSpent,toScopeName,statSpent,Object.entries,combine,toChart)(ideas);
	// toChart
	// const titles=preData[0]
	// const data=toChart(["",...preData[1]]);
	// console.log('preData is :',preData)
			// 
	console.log('data is :',data)
	const titles=["1 to 7 days", "8 to 30 days", "31 to 60 days", "61 to 120 days", "over 120 days"]
	const formatFn=(v,id)=> console.log(v,id) || id
	const config={
		// bar: {width: {ratio: 0.5 }},
    	// labels:{format:formatFn}
    	axis: {
		    x: {
		        type: 'category',
		        categories: titles
		    }
		}
	};
	return {data,config};
};
const Histo=props=>{
	const {data,config}=getProps(props);
	const _data={columns: [
		["data1", 30, 200, 100, 400, 150, 250],
    ],}
	// const test={
	//   data: {
	//     columns: [
	// 	["data1", 30, 200, 100, 400, 150, 250],
	//     ],
	//     type: "bar"
	//   },
	// }
	return (
		<div>
			<BillboardChart {...{data,...config}}/>
		</div>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Histo;