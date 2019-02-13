import React, { Fragment as Frag} from "react";
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
	const beingEdit= title=> editing && title!=="id";
	const updateThisJob= (title, value)=> updateJob({...thisJob, [title]:value})
	const oneItem= ([title,value_],index)=> {
		const value = beingEdit(title) ? <Input defaultValue={value_} onBlur={e=>updateThisJob(title, e.target.value)}/> : value_;
		return <tr key={index}><td>{title}</td><td>{value}</td></tr>
	}
	const toBeforeView= ()=> updateUI({editing:false});
	const MyTable= pipe(
		prop('thisJob'),
		Object.entries,
		mapIndex(oneItem),
		dom=> <table><tbody>{dom}</tbody></table>
	)
	const toggleEdit=()=>updateUI({editing:!editing});
	const editButton= editing ? <Frag/> : <button onClick={toggleEdit}>Edit</button>
	return { MyTable, editButton, toBeforeView};
};
const Jobs=props=>{
	const { MyTable, editButton, toBeforeView} = getProps(props);
  	const {thisJob}= props;
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<Link to="/jobs"> <button onClick={toBeforeView}>Back to List</button></Link>
			<h1>Just Job</h1>
			{editButton}
			<MyTable thisJob={thisJob} />
		</div>
	);
};
export default Jobs;