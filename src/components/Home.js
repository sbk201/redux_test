import React from "react";
// import PropTypes from "prop-types";
import {is, pipe, curry} from 'ramda';
import SalaryResultCont from '../containers/SalaryResultCont';
import SalaryForm from './SalaryForm';
import {Button} from 'react-bootstrap';
import {travelArray} from '../init/project';

const compute= UI=> {
	const {mode, salary, dutyDays, dutyHours, travelIndex, travelCost, mpf}= UI;
	const ifFn= curry( (condit, fn, value)=> condit? fn(value) : value )
	if(!is(Number,salary)) return;
	if(mode=== 'advance') return advanceFn();
	return simpleFn();
	function simpleFn() {
		const preDay= salary/dutyDays;
		const preHour= preDay/dutyHours;
		const totalHours= dutyHours;
		return {preDay, preHour, totalHours}
	}
	function advanceFn() {
		const forMpf= ifFn(mpf, x=> x* .95);
		const newSalary= pipe(forMpf)(salary);
		const totalHours= dutyHours+ travelArray[travelIndex]/60;
		const preDay= newSalary/dutyDays -travelCost;
		const preHour= preDay/totalHours;
		return {preDay, preHour, totalHours}
	}
}
const getProps=props=>{
	const {updateUI, UI}= props;
  	const mode= props.match.path.slice(1) || "simple";
	const computeObj={...UI, mode}
	const {preDay, preHour, totalHours}= compute(computeObj) || {};
	return {mode, preDay, preHour, totalHours}
}
const Home=props=>{
  	const {UI, updateUI}=props;
  	const {mode, preDay, preHour, totalHours}=getProps(props);
	return (
		<div>
			<h1>Salary Calculator ({mode})</h1>
			<SalaryForm {...{UI, updateUI, mode}}/>
			<hr/>
			<SalaryResultCont {...{mode, preDay, preHour, totalHours}}/>
		</div>
	);
}
export default Home