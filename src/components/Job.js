import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
// import {format} from "date-fns"
import {pipe, prop, map, addIndex} from "ramda";

const getProps=props=>{
	// const {updateJob}= props;
	const mapIndex=addIndex(map);
	const oneItem= ([title,value],index)=> <div key={index}>{title} , {value}</div>
	const MyTable= pipe(
		prop('thisJob'),
		Object.entries,
		mapIndex(oneItem)
	)
	return {MyTable};
};
const Jobs=props=>{
  	const {MyTable}=getProps( props );
  	const {thisJob}= props;
  	console.log(thisJob)
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Just Job</h1>
			<MyTable thisJob={thisJob} />
		</div>
	);
};
export default Jobs;