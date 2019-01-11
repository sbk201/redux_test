import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapIndex} from '../init/global';
import {is, multiply, pipe, lte, converge} from 'ramda';
const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} name={refer} {...{...rest}}/>;

// .<div>User <Input refer={"username"} defaultValue="user01"/></div>

const compute= UI=> {
	const {salary, dutyDays, dutyHours}= UI;
	// if(is(salary)==="number")
	const preDay= salary/dutyDays;
	const preHour= preDay/dutyHours;
	return {preDay,preHour}
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
	// const itemFn= (item, i)=> <Frag key={i}>
	// <div>{i+1}, {item.title}<br/> {item.author} </div><br/>
	// </Frag>
	// const NewsList= ({list})=> mapIndex(itemFn)(list)
	return {saveData, rangeConfig, ...compute(UI)}
}
const SalaryResult= ({preDay, preHour})=>{
	const check= target=> is(Number,target) && lte(0,target);
	if(!check(preDay) || !check(preHour)) return <div>Please Fill</div>
	const to= pipe(x=> x*10, Math.round, x=> x/10);
	return (
	<Frag>
		<h2>Result</h2>
		<div>Pre Day {to(preDay)}</div>
		<div>Pre Hour {to(preHour)}</div>
	</Frag>
	)
}
const Home=props=>{
  	const {news,UI}=props;
  	// testing('test');
  	const {saveData, preDay, preHour, rangeConfig}=getProps(props);
  	const dutyDaysConfig=rangeConfig({max:7, min:.5, step:.5,});
  	const dutyHoursConfig=rangeConfig({max:16, min:.5, step:.5,});
  	// const dutyDaysConfig={type:"range", max:7, min:.5, step:.5, style:{width:"30%"}, className:"slider"};
  	// const dutyHoursConfig={type:"range", max:16, min:.5, step:.5, style:{width:"30%"}, className:"slider"};

			// <NewsList list={news} />
	return (
		<div>
			<h1>Salary Calculator</h1>
			<div> Salary<br/> <Input refer="salary" onChange={saveData} /> </div>
			<div> Duty Days {UI.dutyDays}<br/> <Input refer="dutyDays" onChange={saveData} {...{...dutyDaysConfig}}/> <br/></div>
			<div> Duty Hours {UI.dutyHours}<br/> <Input refer="dutyHours" onChange={saveData} {...{...dutyHoursConfig}}/> <br/></div>
			<hr/>
			<SalaryResult preDay={preDay} preHour={preHour} />
		</div>
	);
}
export default Home