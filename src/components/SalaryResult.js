import React,{Fragment as Frag} from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

const getProps=props=>{
	const {preDay, preHour, totalHours, counter, salary}= props;
	const addJob= ()=> {
		props.addJob({preDay, preHour, totalHours, salary, id:counter+1})
		window.scrollTo(0, 0);
	};
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
		<Link to="/jobs"> 
			<button onClick={addJob} style={{margin:"1rem"}}>+</button>
		</Link>
		 Add to the list ({jobs.length} job)
		
	</Frag>)
}
export default SalaryResult