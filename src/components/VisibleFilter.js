import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const VisibleFilter=({visibleFilter,toggleFilter})=>{
	const toUpperCase=(string)=>string.charAt(0).toUpperCase() + string.slice(1);
	const onClick=(filter)=>toggleFilter(filter);
	const Part=({filter})=><a href={'#'+filter} onClick={()=>onClick(filter)}> {toUpperCase(filter)}</a>
	return (
		<div>
			{visibleFilter}<br/>
			<Part filter="all"/>
			<Part filter="done"/>
			<Part filter="yet"/>
		</div>
	);
};

VisibleFilter.propTypes = {
	// onClick:PropTypes.func.isRequired,
	// question:PropTypes.shape({
		// ask: PropTypes.string.isRequired,
		// answer: PropTypes.string.isRequired,
	// }).isRequired
};
export default VisibleFilter;