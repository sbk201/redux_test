import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {both, complement, is, pipe, cond, equals, always} from 'ramda';
import {travelArray} from '../init/project';
// import {Button} from 'react-bootstrap';
const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} name={refer} {...{...rest}}/>;

// .<div>User <Input refer={"username"} defaultValue="user01"/></div>
const getProps=props=>{
	const {updateUI, UI}= props;

	const saveData= ({target})=> {
		const name=target.getAttribute('name');
		const getValue=cond([
			[equals('checkbox'), always(target.checked)],
			[()=>true, always(target.value)],
		]);
		const isValidNumber = both(is(Number), complement(equals(NaN)));
		const canBeNumber= target=> isValidNumber(parseFloat(target)) ? parseFloat(target) : target;
		const value=pipe(getValue, canBeNumber)(target.type);
		updateUI({[name]:value});
	}
	const rangeConfig_a= cmd=> 
		({step:.5 , type:"range", className:"slider", style:{width:"30%"}, ...cmd });
  	const rangeConfig= params=> rangeConfig_a({onChange:saveData, defaultValue:UI[params.refer], ...params })
	return {saveData, rangeConfig, rangeConfig_a }
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
  	const {saveData, rangeConfig}=getProps(props);
  	const dutyDaysConfig=rangeConfig({min:.5, max:7, refer:"dutyDays"});
  	const dutyHoursConfig=rangeConfig({min:.5, max:16, refer:"dutyHours"});
  	const travelMax=travelArray.length-1;
  	const travelIndexConfig=rangeConfig({min:0, max:travelMax, step:1, refer:"travelIndex"});
  	const travelCostConfig=rangeConfig({min:0, max:100, step:1, refer:"travelCost"});
	return (
	<Frag>
		<div> Salary <Input refer="salary" onChange={saveData} defaultValue={UI.salary}/>  </div>
		Included MPF? <Input type="checkbox" refer="mpf" onChange={saveData} defaultChecked={UI.mpf}/>
		<div> Duty Days {UI.dutyDays}<br/> <Input {...dutyDaysConfig}/> <br/></div>
		<div> Duty Hours {UI.dutyHours}<br/> <Input {...dutyHoursConfig}/> <br/></div>
		<div> Travel Time Per Day (Mins){travelArray[UI.travelIndex]}<br/> <Input {...travelIndexConfig}/> <br/></div>
		<div> Travel Cost Per Day ${UI.travelCost}<br/> <Input {...travelCostConfig}/> <br/></div>
	</Frag>
)}
const SalaryForm=props=>{
  	const {mode}=props;
  	if(mode=== "advance") return <Advance props={props}/>
	return <Simple props={props}/>
}
export default SalaryForm