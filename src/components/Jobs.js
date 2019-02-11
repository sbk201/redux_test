import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
import {map, addIndex} from "ramda";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const getProps=props=>{
	const {updateJob}= props;
	const columns = [
		{dataField: 'title', text: 'Title', sort: true},
		{dataField: 'salary', text: 'Salary', sort: true},
		// {dataField: 'totalHours', text: 'Total Hours', sort: true},
		// {dataField: 'preDay', text: 'Pre Day($)', sort: true},
		{dataField: 'preHour', text: 'Pre Hour($)', sort: true},
		{dataField: 'url', text: 'URL'},
	];
	// const afterSaveCell= (o, n, job) => updateJob(job);
  	// const cellEdit=cellEditFactory({ mode: 'click', blurToSave:true, afterSaveCell});
	return {columns};
};
const Jobs=props=>{
  	const {columns}=getProps( props );
  	const {jobs}= props;
	const defaultSorted = [{
	  dataField: 'preHour',
	  order: 'desc'
	}];
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Jobs</h1>
			<BootstrapTable keyField='id' data={ jobs } columns={ columns } defaultSorted={defaultSorted}
 			striped hover condensed/>
		</div>
	);
};
export default Jobs;