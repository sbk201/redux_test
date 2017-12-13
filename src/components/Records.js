import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {questionList} from "../initData";

const Selection=({spentArr})=>{
	// const list=records.map(ele=>ele|0);
	console.log(spentArr);
	const Li=styled.li`
	list-style: none;
	`
	const Ul=styled.ul`
	padding-left: 0.5em;
	`
	// console.log(records);
	return (
		<div>
			Record
			<Ul>
				{spentArr.map((ele,th)=><Li key={th}>{th}. {ele}s</Li>)}				
				{/*<Li>1</Li>*/}
				{/*<Li>2</Li>*/}
			</Ul>
		</div>
	);
};
// {records.map(ele=>
					{/*<Li>{ele}</Li>	*/}
				// )}
Selection.propTypes = {
	// newQuestion:PropTypes.func.isRequired,
	// question:PropTypes.shape({
		// ask: PropTypes.string.isRequired,
		// answer: PropTypes.string.isRequired,
	// }).isRequired
};
export default Selection;