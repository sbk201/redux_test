import React from "react";
import PropTypes from 'prop-types';

const Counter=({number,onAddNumber})=>{
	return (
	<div>
	Counter : {number} <button onClick={onAddNumber}>Add</button>
	</div>
)
};

Counter.propTypes = {
}
export default Counter