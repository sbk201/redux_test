import React from "react";
// import PropTypes from "prop-types";
import SalaryResultCont from '../containers/SalaryResultCont';
import SalaryForm from './SalaryForm';

// const getProps=props=>{
	// const {}= props;
  	// const mode= props.match.path.slice(1) || "simple";
	// return {mode}
// }
const Home=props=>{
  	const {UI, updateUI}=props;
  	const mode= props.match.path.slice(1) || "simple";
  	const form={...UI, mode}
	return (
		<div>
			<h1>Salary Calculator ({mode})</h1>
			<SalaryForm {...{UI, updateUI, mode}}/>
			<hr/>
			<SalaryResultCont form={form}/>
		</div>
	);
}
export default Home