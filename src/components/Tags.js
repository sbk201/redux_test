import React from "react";
// import PropTypes from "prop-types";
import {mapProps} from "../init/global";

const getProps=({pid})=>{
	const onDelete=info=>e=>console.log(`deleting tag ${info}`);
	const Items=mapProps(
		(tag,i)=>pid=>
		<span key={i}>
			<button onClick={onDelete(`${tag} , ${pid}`)}>{"x "+tag}</button>
		</span>)
	return {Items};
}
const Tag=props=>{
  	const {data,pid}=props;
  	const {Items}=getProps(props);
	return (
		<div>
			<Items tags={data} pid={pid}/>
		</div>
	);
}
export default Tag