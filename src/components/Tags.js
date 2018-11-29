import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapProps} from "../init/global";

const getProps=({UI,updateUI})=>{
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
			<Items tags={data} pid={pid}/> <button > + </button>
		</div>
	);
}
export default Tag