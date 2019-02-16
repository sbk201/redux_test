import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
import {map, pipe, evolve} from "ramda";
import BootstrapTable from 'react-bootstrap-table-next';
// import cellEditFactory from 'react-bootstrap-table2-editor';
const getDomain= url=> {
	const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
		return match[2];
	}
	else {
		return null;
	}
}
const getProps=props=>{
	const {delJob}= props;
	const rowEvents = {
	  onClick: ({target}, row, rowIndex) => {
	  	const className=target.className;
	  	const {id, realUrl}= row;
	  	if(className==="buttonView") props.history.push(`/jobs/${id}`);
	  	if(className==="buttonDelete") window.confirm("Delete?") && delJob(id);
	  	if(className==="url") {
	  		if(!realUrl) return
	  		console.warn(`stopped window open ${realUrl}`)
	  		// window.open(realUrl,'_blank');
			console.log(getDomain(realUrl));
	  	}
	  }
	};
  	const norm= pipe(
		map(job=> ({...job, buttonView:"View", buttonDelete:"Delete", realUrl:job.url})),
		map(evolve({ url: getDomain }))
	) 
	const buttonStyle={textAlign:"center", cursor: "pointer"};
	const columns = [
		{dataField: 'buttonView', text: '', style: buttonStyle, classes:"buttonView"},
		{dataField: 'title', text: 'Title', sort: true},
		{dataField: 'salary', text: 'Salary($)', sort: true},
		// {dataField: 'totalHours', text: 'Total Hours', sort: true},
		// {dataField: 'preDay', text: 'Pre Day($)', sort: true},
		{dataField: 'preHour', text: 'Pre Hour($)', sort: true},
		{dataField: 'url', text: 'URL', classes:"url", style:{cursor: "pointer"}},
		{dataField: 'buttonDelete', text: '', style: buttonStyle, classes:"buttonDelete"},
	];
	return {columns, rowEvents, norm};
};
const Jobs=props=>{
  	const {columns, rowEvents, norm}=getProps( props );
  	const {jobs}= props;
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