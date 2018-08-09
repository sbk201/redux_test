import React from "react";
// import {format as dateFormat} from 'date-fns'
import {Containerion} from "../init/project";
import {flow,merge} from "lodash";
import { Select } from "semantic-ui-react";
import ReactHighcharts from "react-highcharts";
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsGague from 'highcharts/modules/solid-gauge';

HighchartsMore(ReactHighcharts.Highcharts);
HighchartsGague(ReactHighcharts.Highcharts);
		
// HighchartsMore(ReactHighcharts.Highcharts);

const config4={
	"chart": {
		"type": "solidgauge"
	},
	"title": null,
	"pane": {
		"center": ["50%", "85%"],
		"size": "140%",
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
			[0.1, "#55BF3B"],
			[0.5, "#DDDF0D"],
			[0.9, "#DF5353"]
		],
		"lineWidth": 0,
		"minorTickInterval": null,
		"tickAmount": 2,
		"title": {
			"y": -70,
			"text": "Speed"
		},
		"labels": {
			"y": 16
		},
		"min": 0,
		"max": 200
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
	"credits": {
		"enabled": false
	},
	"series": [
		{
			"name": "Speed",
			"data": [180],
			"dataLabels": {
				"format": "<div style=\"text-align:center\"><span style=\"font-size:25px;color:black\">{y}</span><br/><span style=\"font-size:12px;color:silver\">km/h</span></div>"
			},
			"tooltip": {
				"valueSuffix": " km/h"
			}
		}
	]
};
const config1={
	chart: {
		type: "solidgauge"
	},
	title: null,

	pane: {
		center: ["50%", "85%"],
		size: "140%",
		startAngle: -90,
		endAngle: 90,
		background: {
			backgroundColor: "#EEE",
			innerRadius: "60%",
			outerRadius: "100%",
			shape: "arc"
		}
	},
	tooltip: {
		enabled: false
	},
	// the value axis
	yAxis: {
		stops: [
			[0.1, "#55BF3B"], // green
			[0.5, "#DDDF0D"], // yellow
			[0.9, "#DF5353"] // red
		],
		lineWidth: 0,
		minorTickInterval: null,
		tickAmount: 2,
		title: {
			y: -70
		},
		labels: {
			y: 16
		}
	},
	plotOptions: {
		solidgauge: {
			dataLabels: {
				y: 5,
				borderWidth: 0,
				useHTML: true
			}
		}
	}
};
const getProps=props=>{
	const {ideas,name}=props;
	const config2={
		yAxis: {
			min: 0,
			max: 200,
			title: {
				text: "Speed"
			}
		},

		credits: {
			enabled: false
		},

		series: [{
			name: "Speed",
			data: [180],
			dataLabels: {
				format: "<div style=\"text-align:center\"><span style=\"font-size:25px;color:black\">{y}</span><br/>" +
   "<span style=\"font-size:12px;color:silver\">km/h</span></div>"
			},
			tooltip: {
				valueSuffix: " km/h"
			}
		}]
	};
	// const config=merge(config1,config2);
	const config=config4;
	console.log(config)
	return {config};
};
const Donut=props=>{
	const {config}=getProps(props);
	
	return (
		<Containerion>
			<div style={{height:"3rem"}}><span style={{fontSize:"1.5rem"}}>Gague</span></div><hr/>
			<ReactHighcharts {...{config}}/>
		</Containerion>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Donut;