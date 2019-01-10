import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapIndex} from '../init/global';
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
	// const itemFn= (item, i)=> <Frag key={i}>
	// <div>{i+1}, {item.title}<br/> {item.author} </div><br/>
	// </Frag>
	// const NewsList= ({list})=> mapIndex(itemFn)(list)
	return {saveData, ...compute(UI)}
}
const Home=props=>{
  	const {news}=props;
  	// testing('test');
  	const {saveData,preDay,preHour}=getProps(props);
			// <NewsList list={news} />
	return (
		<div>
			<h1>Salary Calculator</h1>
			<div> Salary<br/> <Input refer="salary" onChange={saveData} /> </div>
			<div> Duty Days<br/> <Input refer="dutyDays" onChange={saveData} /> </div>
			<div> Duty Hours<br/> <Input refer="dutyHours" onChange={saveData} /> </div>
			<hr/>
			<h2>Result</h2>
			<div>Pre Day {preDay}</div>
			<div>Pre Hour {preHour}</div>
		</div>
	);
}
export default Home