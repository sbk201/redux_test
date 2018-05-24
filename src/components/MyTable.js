import React from "react";
import { Table } from 'semantic-ui-react'
import {omit} from "lodash"; 
import T from "prop-types";

const Header=({data,config})=>{
	const {match,style}=config.head
	const HeaderCells=()=>{
		const keys=Object.keys(data[0])
		.map(key=>match[key])
		.filter(key=>key)
		.map((key,i)=> <Table.HeaderCell key={i}>{key}</Table.HeaderCell>);
		return keys
	}
	return (<Table.Header {...{style}}><Table.Row>
				<HeaderCells/>
			</Table.Row></Table.Header>)
}
const Body=({data:rawData,config})=>{
	const data=(function() {
		const {page=1,entries=rawData.length}=config.body;
		return rawData.slice((page-1)*entries,page*entries);
		})();
	const f=()=>{};
	const Cell=({cellsData})=>cellsData.map(([key,value])=>{
		const {onClick=f,style={}}=config.body.cell;
		const attrs={
				style, key,onClick:()=>onClick({key,value})
			}
			return	<Table.Cell {...{...attrs}}>{value}</Table.Cell>
	})
	const getTheRows=(row_,i)=>{
		const {rowAttr=f,onClick=f,exclude=""}=config.body.row;
		const rowFn= r => Object.entries( omit(r,exclude) );
		const row=rowFn(row_);
		const attr={
			onClick:()=>onClick(row),
			...rowAttr(row_)
		}
		return <Table.Row key={i} {...{...attr}}><Cell cellsData={row}/></Table.Row>
	}
	const TheRows=()=>data.map(getTheRows)
	return <Table.Body><TheRows/></Table.Body>
}
const MyTable=props=>{
	const {data,config}=props;
	if(data.length===0) return <div>No Result</div>
	return (
		<Table color="blue" celled selectable inverted>
	        <Header {...{data,config}} />
	        <Body {...{data,config}}/>
    	</Table>
	);
}

MyTable.propTypes ={
	config:T.shape({
		head: T.shape({
			match: T.shape({
				custName: T.string.isRequired,
				globalCustName: T.string.isRequired,
				globalCustNbr: T.string.isRequired,
				localCustNbr: T.string.isRequired
			}).isRequired,
			style: T.shape({})
		}).isRequired,
		body: T.shape({
		}).isRequired
	}).isRequired
};
export default MyTable;