import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
// import {format} from "date-fns"
// import {sortBy, prop, map, mapObjIndexed, pipe} from "ramda";

const getProps=props=>{
	// const {postTag}=props;
	// const S= ()=>" ";
	const Item= ( job,i )=> 
		<div key={i}>
			<button onClick={()=>{}}>X</button> 
			 {i}: {job.preDay} {job.preHour} {job.totalHours}<br/>
			<br/>
		</div>;
	const Items=( {jobs} )=>{
		return jobs.map( Item );
 	};
	return {Items};
};
const Jobs=props=>{
  	const {jobs}=props;
  	const {Items}=getProps( props );
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Jobs</h1>
			<Items jobs={jobs}/>
		</div>
	);
};
export default Jobs;