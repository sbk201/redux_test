import React from "react";
// import PropTypes from "prop-types";
// import {mapProp} from "../init/global";
// import {format} from "date-fns"
import {map, addIndex} from "ramda";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const getProps=props=>{
	// const {updateJob}= props;
	return {};
};
const Jobs=props=>{
  	// const {columns, cellEdit}=getProps( props );
  	const {jobs}= props;
	// const onEnter= fn=> e=> e.keyCode === 13 && fn( e.target.value );
	return (
		<div> 
			<h1>Just Job</h1>
			
		</div>
	);
};
export default Jobs;