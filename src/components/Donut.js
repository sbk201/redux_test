import React from "react";
import "react-billboardjs/lib/billboard.css";
import BillboardChart from "react-billboardjs";
// import {format as dateFormat} from 'date-fns'
import {statBy} from "../init/global";
import {flow} from "lodash";
import { Select } from 'semantic-ui-react';

const getProps=props=>{
	const {ideas,name,updateUI,UI}=props;
	const isArea=name==="Area";
	const statusFilter=UI.filter1;
	const noFilter=!isArea || !statusFilter || statusFilter==='All';
	const stFilter=arr=>arr.filter(ele=> noFilter ? true : ele.Status===UI.filter1);
	const addArea=arr=>arr.map(([key,va])=> isArea ? ["Area "+key,va] : [key,va]);
	const toChart=arr=>({columns:arr,type:"donut"});
	const data=flow(stFilter,statBy(name),Object.entries,addArea,toChart)(ideas);
	const donut={title:name};
	const toPrecent=v=>(~~(v*1000))/10;
	const toValue=(value,ratio)=> `${value} (${toPrecent(ratio)}%)`
	const tooltip={
		format: {value: toValue },
	};
	const Selection=()=>{
		if(name!=="Area") return <div></div>
		const list=["All","Reviewed","Completed","In-Progress","Closed - Not Viable","Approved","Closed","Awaiting Review","null"]
		.map(ele=>({key:ele,value:ele,text:ele}));
		return <Select placeholder='Status' value={UI.filter1} options={list} onChange={e=>updateUI({filter1:e.target.innerText})}/>
	}
	const size={width: 400,height: 250};
	const legend= {position: "right"};
	const config={tooltip,size,legend,};
	return {data,donut,config,Selection};
};
const Donut=props=>{
	const {data,donut,config,Selection}=getProps(props);
	const options=Array(5).fill('').map((ele,i)=>({key:i,value:i,text:i}))
	return (
		<div>
			<Selection/>
			<BillboardChart {...{data,donut,...config}}/>
		</div>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Donut;