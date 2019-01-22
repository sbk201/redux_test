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
		const totalHours= dutyHours+ travelArray[travelIndex]/60*2;
		const preDay= newSalary/dutyDays -travelCost;
		const preHour= preDay/(dutyHours+ travelArray[travelIndex]/60*2);
		return {preDay, preHour, totalHours}
	}
}
const upper= text=> {
	if(!text || text==="") return "";
	return text[0].toUpperCase() + text.slice(1);
}
const getProps=props=>{
	const {updateUI, UI}= props;
	const toggleMode= mode_=> {
		const mode= mode_ ==="advance" ? "simple" : "advance";
		updateUI({mode});
	};

	const {preDay, preHour, totalHours}= compute(UI) || {};
	const mode= (UI&& UI.mode) || "simple";
	return {mode, toggleMode, preDay, preHour, totalHours}
}
const Home=props=>{
  	const {UI, updateUI}=props;
  	const {mode, preDay, preHour, totalHours, toggleMode}=getProps(props);
	return (
		<div>
			<h1>Salary Calculator</h1>
			<Button bsStyle="primary" onClick={()=>toggleMode(mode)}> {upper(mode)} Calculator</Button>
			<SalaryForm {...{UI, updateUI, mode}}/>
			<hr/>
			<SalaryResultCont {...{mode, preDay, preHour, totalHours}}/>
		</div>
	);
}
export default Home