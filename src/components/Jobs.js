import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
import {map, addIndex} from "ramda";
import BootstrapTable from 'react-bootstrap-table-next';
// import cellEditFactory from 'react-bootstrap-table2-editor';
import { createBrowserHistory } from 'history';

const getProps=props=>{
	const {updateJob}= props;
	const rowEvents = {
	  onClick: (e, row, rowIndex) => {
	  	const className=e.target.className;
	  	const id= row.id;
	  	if(className==="theButton") props.history.push(`/jobs/${id}`);
	  	// console.log(, row, rowIndex)
		
	  }
	};
	const buttonStyle={textAlign:"center", cursor: "pointer"};
	const columns = [
		{dataField: 'button', text: '', style: buttonStyle, classes:"theButton"},
		{dataField: 'title', text: 'Title', sort: true},
		{dataField: 'salary', text: 'Salary($)', sort: true},
		// {dataField: 'totalHours', text: 'Total Hours', sort: true},
		// {dataField: 'preDay', text: 'Pre Day($)', sort: true},
		{dataField: 'preHour', text: 'Pre Hour($)', sort: true},
		{dataField: 'url', text: 'URL'},
	];
	// const afterSaveCell= (o, n, job) => updateJob(job);
  	// const cellEdit=cellEditFactory({ mode: 'click', blurToSave:true, afterSaveCell});
	return {columns, rowEvents};
};
const Jobs=props=>{
  	const {columns, rowEvents}=getProps( props );
  	const {jobs}= props;
  	const norm= map(job=> ({...job, button:"View"}))
	const defaultSorted = [{
	  dataField: 'preHour',
	  order: 'desc'
	}];
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Jobs</h1>
			<BootstrapTable keyField='id' data={ norm(jobs) } columns={ columns } rowEvents={rowEvents} defaultSorted={defaultSorted}
 			striped hover condensed/>
		</div>
	);
};
export default Jobs;