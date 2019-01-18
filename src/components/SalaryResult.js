import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
// import {mapIndex} from '../init/global';
import {pipe, lte, is} from 'ramda';

// const Simple= ({preDay, preHour})=>{
// 	const to= pipe(x=> x*10, Math.round, x=> x/10);
// 	return (
// 	<Frag>
// 		<h2>Result (Simple)</h2>
// 		<div>Pre Day ${to(preDay)}</div>
// 		<div>Pre Hour ${to(preHour)}</div>
// 	</Frag>
// 	)
// }
// const Advance= ({preDay, preHour})=>{
// 	const to= pipe(x=> x*10, Math.round, x=> x/10);
// 	return (
// 	<Frag>
// 		<h2>Result (Advance)</h2>
// 		<div>Pre Day ${to(preDay)}</div>
// 		<div>Pre Hour ${to(preHour)}</div>
// 	</Frag>
// 	)
// }
// const getProps=props=>{
	// return {preDay, preHour}
// }
const SalaryResult= ({preDay, preHour, totalHours})=>{
	const check= target=> is(Number,target) && lte(0,target);
	if(!check(preDay) || !check(preHour)) return <div>Please Fill</div>
	const to= pipe(x=> x*10, Math.round, x=> x/10);
	return (<Frag>
		<h2>Result (Simple)</h2>
		<div>Hour pre day {to(totalHours)}</div>
		<div>Pre Day ${to(preDay)}</div>
		<div>Pre Hour ${to(preHour)}</div>
	</Frag>)
}
/*
	if(mode==="simple") return <Simple preDay={preDay} preHour={preHour} />
	if(mode==="advance") return <Advance {...rest} />
	return <div>Error mode {mode}</div>
*/
export default SalaryResult