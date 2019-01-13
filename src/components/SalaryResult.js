import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapIndex} from '../init/global';
import {is, multiply, pipe, lte, converge} from 'ramda';
const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} name={refer} {...{...rest}}/>;

// .<div>User <Input refer={"username"} defaultValue="user01"/></div>

const getProps=props=>{
	// return {saveData, rangeConfig, ...compute(UI)}
}
const Simple= ({preDay, preHour})=>{
	const to= pipe(x=> x*10, Math.round, x=> x/10);
	return (
	<Frag>
		<h2>Result (Simple)</h2>
		<div>Pre Day {to(preDay)}</div>
		<div>Pre Hour {to(preHour)}</div>
	</Frag>
	)
}
const Advance= ({preDay, preHour})=>{
	const to= pipe(x=> x*10, Math.round, x=> x/10);
	return (
	<Frag>
		<h2>Result (Advance)</h2>
		<div>Pre Day {to(preDay)}</div>
		<div>Pre Hour {to(preHour)}</div>
	</Frag>
	)
}
const SalaryResult= ({preDay, preHour})=>{
	const check= target=> is(Number,target) && lte(0,target);
	if(!check(preDay) || !check(preHour)) return <div>Please Fill</div>
	const to= pipe(x=> x*10, Math.round, x=> x/10);
	return (
		<Simple preDay={preDay} preHour={preHour} />
	)
}
export default SalaryResult