import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapIndex} from '../init/global';
import {is, cond, equals, always, lensProp, over} from 'ramda';
import SalaryResult from './SalaryResult';
import {Button} from 'react-bootstrap';
const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} name={refer} {...{...rest}}/>;

// .<div>User <Input refer={"username"} defaultValue="user01"/></div>

const compute= UI=> {
	const {salary, dutyDays, dutyHours, mpf}= UI;
	if(!is(String,salary)) return;
	const newSalary= mpf ? salary* .95 : salary;
	const preDay= newSalary/dutyDays;
	const preHour= preDay/dutyHours;
	return {preDay,preHour}
}
const upper= text=> {
	if(!text || text==="") return "";
	return text[0].toUpperCase() + text.slice(1);
}
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
	const toggleMode= mode_=> {
		const mode= mode_ ==="advance" ? "simple" : "advance";
		updateUI({mode});
	};
	const mode= (UI&& UI.mode) || "simple";
	return {mode, saveData, rangeConfig, toggleMode, ...compute(UI)}
}
const Home=props=>{
  	const {UI}=props;
  	const {mode, saveData, preDay, preHour, rangeConfig, toggleMode}=getProps(props);
  	const dutyDaysConfig=rangeConfig({max:7, min:.5, step:.5, refer:"dutyDays", onChange:saveData});
  	const dutyHoursConfig=rangeConfig({max:16, min:.5, step:.5, refer:"dutyHours", onChange:saveData});
	return (
		<div>
			<h1>Salary Calculator</h1>
			<Button bsStyle="primary" onClick={()=>toggleMode(mode)}> {upper(mode)} Calculator</Button>
			<div> Salary<br/> <Input refer="salary" onChange={saveData} />  </div>
			<Input type="checkbox" refer="mpf" onChange={saveData}/> Included MPF?
			<div> Duty Days {UI.dutyDays}<br/> <Input {...dutyDaysConfig}/> <br/></div>
			<div> Duty Hours {UI.dutyHours}<br/> <Input {...dutyHoursConfig}/> <br/></div>
			<hr/>
			<SalaryResult preDay={preDay} preHour={preHour} mode={mode}/>
		</div>
	);
}
export default Home