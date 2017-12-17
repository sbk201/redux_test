import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Records=({spentArr,hardQuestions})=>{
	// console.log(spentArr);

	const Li=styled.li`
	list-style: none;
	`;
	const Ul=styled.ul`
	padding-left: 0.5em;
	`;
	const Wraper=styled.div`
		display: grid;
		grid-template-rows: 7em 1fr;
		height: 100vh;
	`;
	const style1={height: "calc(100vh - 7em)",overflowY: "auto"};
	console.log(hardQuestions);
	return (
		<Wraper>
			<div>
			Record
				<Ul>
					{hardQuestions.slice(0,3).map((ele,th)=><Li key={th}>{ele.time}s {ele.question}</Li>)}
				</Ul>
				<hr/>
			</div>
			<div style={style1}>
				<Ul>
					{spentArr.map((ele,th)=><Li key={th}>{ele.time}s {ele.question}</Li>)}
				</Ul>
			</div>
		</Wraper>
	);
};
Records.propTypes = {
	spentArr: PropTypes.arrayOf(PropTypes.shape({
		time:PropTypes.number.isRequired,
		question:PropTypes.string.isRequired,
	}).isRequired).isRequired,
};
export default Records;