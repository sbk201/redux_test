import React from "react";
// import {format as dateFormat} from 'date-fns'
import {Containerion} from "../init/project";
import {assignWhere} from '../init/global';
import MyTable from "./MyTable";
import {omit,flow} from "lodash";
import {format} from "date-fns";


const getProps=props=>{
	const {ideas}=props;
	const convertDates=ele=>{
		const toDate=date=>format(date, 'DD/MM/YYYY');
		const where=[["Created",toDate],["DateDue",toDate]];
		return assignWhere(ele,where)
	};
	// const toHtml=ele=>{
		// const Detail=
		// <div dangerouslySetInnerHTML={{__html: this.state.output}} />
	// }
	const data=ideas.map(ele=>omit(convertDates(ele),"DateCompleted"));
	return {data,config:{}};
};

const Table=props=>{
	// const {}=props;
	const {data,config}=getProps(props);
	
	return (
		<Containerion>
			<div style={{height:"3rem"}}><span style={{fontSize:"2rem"}}>Table</span></div><hr/>
			<MyTable {...{data,config}}/>
		</Containerion>
	);
};
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Table;