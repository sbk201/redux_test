import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapIndex} from '../init/global';
// import {pipe, converge} from 'ramda';
import SalaryResult from './SalaryResult';
import {Button} from 'react-bootstrap';
const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} name={refer} {...{...rest}}/>;

// .<div>User <Input refer={"username"} defaultValue="user01"/></div>

const compute= UI=> {
	const {salary, dutyDays, dutyHours}= UI;
	// if(is(salary)==="number")
	const preDay= salary/dutyDays;
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
		const value=target.value;
		updateUI({[name]:value});
	}
	const rangeConfig= cmd=> 
	({ ...cmd, type:"range", className:"slider", style:{width:"30%"}, });
	const toggleMode= mode_=> {
		const mode= mode_ ==="advance" ? "simple" : "advance";
		updateUI({mode});
	};
	const mode= (function (){
		const theMode= (UI&& UI.mode) || "simple"
		const output= theMode[0].toUpperCase() + theMode.slice(1)
		return output
	})();
	return {mode, saveData, rangeConfig, toggleMode, ...compute(UI)}
}
const Home=props=>{
  	const {UI}=props;
  	// testing('test');
  	const {mode, saveData, preDay, preHour, rangeConfig, toggleMode}=getProps(props);
  	const dutyDaysConfig=rangeConfig({max:7, min:.5, step:.5,});
  	const dutyHoursConfig=rangeConfig({max:16, min:.5, step:.5,});
  	// const dutyDaysConfig={type:"range", max:7, min:.5, step:.5, style:{width:"30%"}, className:"slider"};
  	// const dutyHoursConfig={type:"range", max:16, min:.5, step:.5, style:{width:"30%"}, className:"slider"};
	return (
		<div>
			<h1>Salary Calculator</h1>
			<Button bsStyle="primary" onClick={()=>toggleMode(UI.mode||"")}>{upper(UI.mode)} Calculator</Button>
			<div> Salary<br/> <Input refer="salary" onChange={saveData} /> </div>
			<div> Duty Days {UI.dutyDays}<br/> <Input refer="dutyDays" onChange={saveData} {...{...dutyDaysConfig}}/> <br/></div>
			<div> Duty Hours {UI.dutyHours}<br/> <Input refer="dutyHours" onChange={saveData} {...{...dutyHoursConfig}}/> <br/></div>
			<hr/>
			<SalaryResult preDay={preDay} preHour={preHour} />
		</div>
	);
}
export default Home