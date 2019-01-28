import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
// import {format} from "date-fns"
import {map, addIndex} from "ramda";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const mapIndex=addIndex(map);
const getProps=props=>{
	const columns = [
		{dataField: 'title', text: 'Title', sort: true},
		// {dataField: 'id', text: 'ID'},
		{dataField: 'totalHours', text: 'Total Hours', sort: true},
		{dataField: 'preDay', text: 'Pre Day', sort: true},
		{dataField: 'preHour', text: 'Pre Hour', sort: true},
		{dataField: 'url', text: 'URL'},
	];
  	const cellEdit=cellEditFactory({ mode: 'click', blurToSave:true});
	const normalize= mapIndex((job,i)=>({...job, id:i, url:"", title:""}));
	return {columns, normalize, cellEdit};
};
const Jobs=props=>{
  	const {columns, normalize, cellEdit}=getProps( props );
  	const {jobs}= props;
  	console.log(jobs);
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Jobs</h1>
			<BootstrapTable keyField='id' data={ jobs } columns={ columns } cellEdit={ cellEdit }
 			striped hover condensed/>
		</div>
	);
};
export default Jobs;