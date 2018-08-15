import React from "react";
import {Containerion} from "../init/project";
import ReactHighcharts from "react-highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsGauge from "highcharts/modules/solid-gauge";
import {differenceInDays} from 'date-fns'

HighchartsMore(ReactHighcharts.Highcharts);
HighchartsGauge(ReactHighcharts.Highcharts);

const rawConfig=value=>({
	"chart": {
		"type": "solidgauge",
		height: 300,
		width: 380,
		backgroundColor:null,
	},
	"title": null,
	"pane": {
		"center": ["50%", "85%"],
		"size": "130%",
		"startAngle": -90,
		"endAngle": 90,
		"background": {
			"backgroundColor": "#EEE",
			"innerRadius": "60%",
			"outerRadius": "100%",
			"shape": "arc"
		}
	},
	"tooltip": {
		"enabled": false
	},
	"yAxis": {
		"stops": [
			[0.1, "#DF5353"],
			[0.5, "#DDDF0D"],
			[0.9, "#55BF3B"]
		],
		"lineWidth": 0,
		"minorTickInterval": null,
		"tickAmount": 2,
		"title": {
			"y": -100,
			"text": "%",
			style:{"fontSize": "1.5rem" }
		},
		"labels": {
			"y": 16
		},
		"min": 0,
		"max": 100
	},
	"plotOptions": {
		"solidgauge": {
			"dataLabels": {
				"y": 5,
				"borderWidth": 0,
				"useHTML": true
			}
		}
	},
	"credits": false,
	"series": [
		{
			"name": "Speed",
			"data": [value],
			"dataLabels": {
				"format": "<div style=\"text-align:center\"><span style=\"font-size:25px;color:black\">{y}</span><br/><span style=\"font-size:12px;color:silver\"></span></div>"
			},
			"tooltip": {
				"valueSuffix": ""
			}
		}
	]
});
const getProps=props=>{
	const {ideas}=props;
	const toPrecent=v=> Math.round(v)+"%";
	const number=ideas.reduce((times, {Created,DateDue})=>{
	  const diff=differenceInDays(DateDue,Created);
	  return diff>120 ? times : times+1;
	},0)
	console.log(number)
	const theValue=Math.round(number/ideas.length*100);
	// const config={...rawConfig,series:{data:[theValue]}}
	// const config=rawConfig;
	const config=rawConfig(theValue);
	console.log(config)
	return {config};
};
const Gauge=props=>{
	const {config}=getProps(props);
		
	return (
		<Containerion>
			<div style={{height:"3rem"}}><span style={{fontSize:"2rem"}}>Ideas Completed in 120 days</span></div><hr/>
			<ReactHighcharts {...{config}}/>
		</Containerion>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Gauge;