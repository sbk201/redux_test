import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {mapProps} from "../init/global";

const getProps=({UI,updateUI})=>{
	const onDelete=info=>e=>console.log(`deleting tag ${info}`);
	const Items=mapProps(
		(tag,i)=>pid=>
		<span key={i}>
			<button onClick={onDelete(`${tag} , ${pid}`)}>{"x "+tag}</button>
		</span>);
	const ButtonPost= ({onClick,pid,tags})=> <button onClick={e=>onClick({pid, tags:tags.concat("message")})}> + </button>;
	return {Items, ButtonPost};
}
const Tag=props=>{
  	const {data,pid,postTag}=props;
  	const {Items ,ButtonPost}=getProps(props);
	return (
		<div>
			<Items tags={data} pid={pid}/> <ButtonPost onClick={postTag} tags={data} pid={pid}/ >
		</div>
	);
}
export default Tag