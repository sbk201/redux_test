import React from "react";
// import {format as dateFormat} from 'date-fns'
import {statBy} from "../init/global";
import {flow} from "lodash";
import { Select } from "semantic-ui-react";
import ReactHighcharts from "react-highcharts";

const getProps=props=>{
	const {ideas,name,updateUI,UI}=props;
	const isArea=name==="Area";
	const statusFilter=UI.filter1;
	const noFilter=!isArea || !statusFilter || statusFilter==="All";
	const stFilter=arr=>arr.filter(ele=> noFilter ? true : ele.Status===UI.filter1);
	const addArea=arr=>arr.map(([key,va])=> isArea ? ["Area "+key,va] : [key,va]);
	const data=flow(stFilter,statBy(name),Object.entries,addArea)(ideas);
	console.log('data is :',data)
	const Selection=()=>{
		if(name!=="Area") return <div></div>;
		const list=["All","Reviewed","Completed","In-Progress","Closed - Not Viable","Approved","Closed","Awaiting Review","null"]
			.map(ele=>({key:ele,value:ele,text:ele}));
		return <Select placeholder='Status' value={UI.filter1} options={list} onChange={e=>updateUI({filter1:e.target.innerText})}/>;
	};
	const config={};
	return {data,config,Selection};
};

const Donut=props=>{
	const {data,Selection}=getProps(props);
	const options=Array(5).fill("").map((ele,i)=>({key:i,value:i,text:i}));
	const formatter=function({percentage}) {
		const toPrecent=v=> Math.ceil(v)+"%";
		if(percentage<5) return "";
		return toPrecent(percentage)
	}
	const magrinLeft=90;
	const config={
		title: {
			text: "Idea Status",
			// align: "center",
			// verticalAlign: "middle",
			// x:-magrinLeft,y:0,
			// y: 60
		},
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: 0,
			plotShadow: false,
        	height: 250,
        	width: 380,
			margin: [0, 0, 0, 0],
			spacingTop: 0,
			spacingBottom: 0,
			spacingLeft: 0,
			spacingRight: 0,
			align:"left",
		},
		legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            backgroundColor: '#FFFFFF',
            width:150,

    	},
		tooltip: {
			pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
		},
		credits: false,
		series: [{
			type: "pie",
			name: " ",
			data: data
		}],
		plotOptions: {
			pie: {
				center: [magrinLeft],
      			showInLegend: true,
      			size:180,
				dataLabels: {
  		formatter:function(){return formatter(this)},
					enabled: true,
					distance: -20,
					style: {
						fontWeight: "bold",
						color: "white",
					}
				},
			}
		}
	};
	// <Selection/>
	return (
		<ReactHighcharts {...{config}}/>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Donut;