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
	const rangeConfig= cmd=> 
	({ ...cmd, type:"range", className:"slider", style:{width:"30%"}, });
	return {saveData, rangeConfig }
}
const Simple= ({props})=>{
  	const {UI}=props;
  	const {saveData, rangeConfig}=getProps(props);
  	const dutyDaysConfig=rangeConfig({max:7, min:.5, step:.5, refer:"dutyDays", onChange:saveData});
  	const dutyHoursConfig=rangeConfig({max:16, min:.5, step:.5, refer:"dutyHours", onChange:saveData});
	return (
	<Frag>
		<div> Salary<br/> <Input refer="salary" onChange={saveData} />  </div>
		<div> Duty Days {UI.dutyDays}<br/> <Input {...dutyDaysConfig}/> <br/></div>
		<div> Duty Hours {UI.dutyHours}<br/> <Input {...dutyHoursConfig}/> <br/></div>
	</Frag>
)}
const Advance= ({props})=>{
  	const {UI}=props;
  	const {saveData, rangeConfig}=getProps(props);
  	const dutyDaysConfig=rangeConfig({max:7, min:.5, step:.5, refer:"dutyDays", onChange:saveData});
  	const dutyHoursConfig=rangeConfig({max:16, min:.5, step:.5, refer:"dutyHours", onChange:saveData});
	return (
	<Frag>
		<div> Salary<br/> <Input refer="salary" onChange={saveData} />  </div>
		<Input type="checkbox" refer="mpf" onChange={saveData}/> Included MPF?
		<div> Duty Days {UI.dutyDays}<br/> <Input {...dutyDaysConfig}/> <br/></div>
		<div> Duty Hours {UI.dutyHours}<br/> <Input {...dutyHoursConfig}/> <br/></div>
	</Frag>
)}
const SalaryForm=props=>{
  	const {mode}=props;
  	if(mode=== "advance") return <Advance props={props}/>
	return <Simple props={props}/>
}
export default SalaryForm