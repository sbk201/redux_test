import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
import {map, pipe, evolve} from "ramda";
import BootstrapTable from 'react-bootstrap-table-next';
// import cellEditFactory from 'react-bootstrap-table2-editor';
import { createBrowserHistory } from 'history';
const getDomain= (url_, subdomain=false) => {
    let url = url_.replace(/(https?:\/\/)?(www.)?/i, '');
    if (!subdomain) {
        url = url.split('.');
        url = url.slice(url.length - 2).join('.');
    }
    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }
    return url;
}
const getProps=props=>{
	const {updateJob}= props;
	const rowEvents = {
	  onClick: ({target}, row, rowIndex) => {
	  	const className=target.className;
	  	const {id, realUrl}= row;
	  	if(className==="theButton") props.history.push(`/jobs/${id}`);
	  	if(className==="url") {
	  		if(!realUrl) return
	  		console.warn(`stopped window open ${realUrl}`)
	  		// window.open(realUrl,'_blank');
	  		console.log(getDomain(realUrl));
	  	}
	  }
	};
  	const norm= pipe(
		map(job=> ({...job, button:"View", realUrl:job.url})),
		map(evolve({url:getDomain}))
	) 
	const buttonStyle={textAlign:"center", cursor: "pointer"};
	const columns = [
		{dataField: 'button', text: '', style: buttonStyle, classes:"theButton"},
		{dataField: 'title', text: 'Title', sort: true},
		{dataField: 'salary', text: 'Salary($)', sort: true},
		// {dataField: 'totalHours', text: 'Total Hours', sort: true},
		// {dataField: 'preDay', text: 'Pre Day($)', sort: true},
		{dataField: 'preHour', text: 'Pre Hour($)', sort: true},
		{dataField: 'url', text: 'URL', classes:"url", style:{cursor: "pointer"}},
	];
	// const afterSaveCell= (o, n, job) => updateJob(job);
  	// const cellEdit=cellEditFactory({ mode: 'click', blurToSave:true, afterSaveCell});
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