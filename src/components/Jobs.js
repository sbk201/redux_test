import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
// import {format} from "date-fns"
import {map, addIndex} from "ramda";
import BootstrapTable from 'react-bootstrap-table-next';

const mapIndex=addIndex(map);
const getProps=props=>{
	const columns = [
		{dataField: 'title', text: 'Title'},
		// {dataField: 'id', text: 'ID'},
		{dataField: 'totalHours', text: 'Total Hours'},
		{dataField: 'preDay', text: 'Pre Day'},
		{dataField: 'preHour', text: 'Pre Hour'},
		{dataField: 'url', text: 'URL'},
	];
	const addId= mapIndex((job,i)=>({...job,id:i}));
	return {columns, addId};
};
const Jobs=props=>{
  	const {columns, addId}=getProps( props );
  	const {jobs}= props;
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Jobs</h1>
			<BootstrapTable keyField='id' data={ addId(jobs) } columns={ columns } 
 			striped hover condensed/>
		</div>
	);
};
export default Jobs;