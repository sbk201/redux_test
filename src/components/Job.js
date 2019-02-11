import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
// import {format} from "date-fns"
import {pipe, prop, map, addIndex} from "ramda";
import { Link } from "react-router-dom";
import {_Input} from '../init/global';

const getProps=props=>{
	const {UI,updateUI, updateJob, thisJob}= props;
	const { editing } = UI;
	const mapIndex=addIndex(map);
	const Input=_Input(this);
	// updateJob
	const updateThisJob= (title, value)=> updateJob({...thisJob, [title]:value})
	const oneItem= ([title,value_],index)=> {
		const value = editing ? <Input defaultValue={value_} onBlur={e=>updateThisJob(title, e.target.value)}/> : value_;
		return <tr key={index}><td>{title}</td><td>{value}</td></tr>
	}
	const MyTable= pipe(
		prop('thisJob'),
		Object.entries,
		mapIndex(oneItem),
		dom=> <table><tbody>{dom}</tbody></table>
	)
	const toggleEdit=()=>updateUI({editing:!editing});
	return { MyTable, toggleEdit, editing};
};
const Jobs=props=>{
	const { MyTable, toggleEdit, editing} = getProps(props);
  	const {thisJob}= props;
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<Link to="/jobs"> <button>Back to List</button></Link>
			<h1>Just Job</h1>
			<button onClick={toggleEdit}>{editing ? "save" : "edit"}</button>
			<MyTable thisJob={thisJob} />
		</div>
	);
};
export default Jobs;