import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
// import {mapIndex} from '../init/global';

const getProps=props=>{
	const {preDay, preHour, totalHours}= props;
	const addJob= ()=> props.addJob({preDay, preHour, totalHours});
	return {addJob}
}
const SalaryResult= props=>{
	const {preDay, preHour, totalHours, jobs}= props;
	const {addJob}= getProps(props);
	return (<Frag>
		<h2>Result</h2>
		<div>Hour pre day {totalHours}</div>
		<div>Pre Day ${preDay}</div>
		<div>Pre Hour ${preHour}</div>
		<button onClick={addJob}>+</button> Add to the list ({jobs.length} job)
	</Frag>)
}
export default SalaryResult