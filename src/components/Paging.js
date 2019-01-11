import React,{Fragment as Frag} from "react";
// import PropTypes from "prop-types";
import {Pagination as Pa } from "react-bootstrap";
import {mapIndex} from '../init/global';
import {pipe, range} from "ramda";

const getProps=props=>{
	const mapFn= onClick=> (__, index)=> <Pa.Item key={index+1} onClick={onClick} value={index+1}>{index+1}</Pa.Item>
	const Items= ({entry, amount, onClick, activePage})=> {
		const length=Math.ceil(amount/entry);
		return pipe( range(0), mapIndex(mapFn(onClick)) )(length)
	}
	return {Items}
}
const Paging=props=>{
  	const {entry, amount, onClick}=props;
  	const {Items}=getProps(props);
	return (
		<Pa bsSize="medium">
			<Items {...{entry, amount, onClick}}/>
		</Pa>
	);
}
export default Paging