import React from "react";
// import {format as dateFormat} from 'date-fns'
import {statBy} from "../init/global";
import {Containerion} from "../init/project";
import {flow} from "lodash";
import { Select,Container } from "semantic-ui-react";
import ReactHighcharts from "react-highcharts";

const getProps=props=>{
	const {ideas,name,updateUI,filter1}=props;
	console.log(filter1);
	const title=`Status in ${name}`;
	const isArea=name==="Area";
	const statusFilter=filter1;
	const noFilter=!isArea || !statusFilter || statusFilter==="All";
	const stFilter=arr=>arr.filter(ele=> noFilter ? true : ele.Status===filter1);
	const addArea=arr=>arr.map(([key,va])=> isArea ? ["Area "+key,va] : [key,va]);
	const data=flow(stFilter,statBy(name),Object.entries,addArea)(ideas);
	// console.log("data is :",data);
	const Selection=()=>{
		const onSelect=(e,{value})=>updateUI({filter1: value || "All"});
		if(name!=="Area") return <div></div>;
		const list=["All","Reviewed","Completed","In-Progress","Closed - Not Viable","Approved","Closed","Awaiting Review","null"]
			.map(ele=>({key:ele,value:ele,text:ele}));
		return <Select placeholder='Status' value={filter1} options={list} onChange={onSelect}/>;
	};
	const config=(function (){
		const formatter=function({percentage}) {
			const toPrecent=v=> Math.round(v)+"%";
			if(percentage<5) return "";
			return toPrecent(percentage);
		};
		const magrinLeft=90;
		const pie={
			center: [magrinLeft],
			showInLegend: true,
			size:180,
			dataLabels: {
				formatter:function(){return formatter(this);},
				enabled: true,
				distance: -20,
				style: {
					fontWeight: "bold",
					// color: "white",
				}
			},
		};
		const theConfig= {
			title: {
				text: "",
			// align: "center",
			// verticalAlign: "middle",
			// x:-magrinLeft,y:0,
			},
			chart: {
				backgroundColor:null,
				plotBackgroundColor: null,
				plotBorderWidth: 0,
				plotShadow: false,
				height: 300,
				width: 380,
				margin: [0, 0, 0, 0],
				spacingTop: 0,
				spacingBottom: 0,
				spacingLeft: 0,
				spacingRight: 0,
			},
			legend: {
				layout: "vertical",
				align: "right",
				verticalAlign: "middle",
				width:150,
    		},
			tooltip: {
				pointFormat: "{series.name} <b>{point.percentage:.1f}% ({point.y})</b>"
			},
			credits: false,
			series: [{
				type: "pie",
				name: " ",
				data: data
			}],
			plotOptions: {pie }
		};
		return theConfig
	})();
	return {data,config,Selection,Containerion,title};
};

const Donut=props=>{
	const {data,Selection,Containerion,config,title}=getProps(props);
	
	return (
		<Containerion>
			<div style={{height:"3rem"}}><span style={{fontSize:"1.5rem"}}>{title}</span> <Selection style={{fontSize:"1rem"}}/></div><hr/>
			<ReactHighcharts {...{config}}/>
		</Containerion>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Donut;