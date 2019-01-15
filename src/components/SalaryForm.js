import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {cond, equals, always} from 'ramda';
// import {Button} from 'react-bootstrap';
const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} name={refer} {...{...rest}}/>;

// .<div>User <Input refer={"username"} defaultValue="user01"/></div>
const getProps=props=>{
	const {updateUI, UI}= props;

	const saveData= ({target})=> {
		const name=target.getAttribute('name');
		const value=cond([
			[equals('checkbox'), always(target.checked)],
			[()=>true, always(target.value)],
		])(target.type);
		updateUI({[name]:value});
	}
	const travelArray= [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
	 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
	const rangeConfig_a= cmd=> 
	({step:.5 , type:"range", className:"slider", style:{width:"30%"}, ...cmd });
  	const rangeConfig= params=> rangeConfig_a({onChange:saveData, ...params, defaultValue:UI[params.refer]})
	return {travelArray, saveData, rangeConfig, rangeConfig_a }
}
const Simple= ({props})=>{
  	const {UI}=props;
  	const {saveData, rangeConfig}=getProps(props);
  	const dutyDaysConfig=rangeConfig({max:7, min:.5, refer:"dutyDays"});
  	const dutyHoursConfig=rangeConfig({max:16, min:.5, refer:"dutyHours"});
	return (
	<Frag>
		<div> Salary <Input refer="salary" onChange={saveData} defaultValue={UI.salary}/>  </div>
		<div> Duty Days {UI.dutyDays}<br/> <Input {...dutyDaysConfig}/> <br/></div>
		<div> Duty Hours {UI.dutyHours}<br/> <Input {...dutyHoursConfig}/> <br/></div>
	</Frag>
)}
const Advance= ({props})=>{
  	const {UI}=props;
  	const {saveData, rangeConfig, travelArray}=getProps(props);
  	const dutyDaysConfig=rangeConfig({min:.5, max:7, refer:"dutyDays"});
  	const dutyHoursConfig=rangeConfig({min:.5, max:16, refer:"dutyHours"});
  	const travelIndexConfig=rangeConfig({min:0, max:24, step:1, refer:"travelIndex"});
	return (
	<Frag>
		<div> Salary <Input refer="salary" onChange={saveData} defaultValue={UI.salary}/>  </div>
		Included MPF? <Input type="checkbox" refer="mpf" onChange={saveData} defaultChecked={UI.mpf}/>
		<div> Duty Days {UI.dutyDays}<br/> <Input {...dutyDaysConfig}/> <br/></div>
		<div> Duty Hours {UI.dutyHours}<br/> <Input {...dutyHoursConfig}/> <br/></div>
		<div> Travel Time (Mins) {travelArray[UI.travelIndex]}<br/> <Input {...travelIndexConfig}/> <br/></div>
	</Frag>
)}
const SalaryForm=props=>{
  	const {mode}=props;
  	if(mode=== "advance") return <Advance props={props}/>
	return <Simple props={props}/>
}
export default SalaryForm