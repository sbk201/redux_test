import React from "react";
import { Table } from 'semantic-ui-react'
import {omit} from "lodash"; 
const Header=({data,column})=>{
	const HeaderCells=()=>{
		const {match}=column.head
		const keys=Object.keys(data[0])
		.map(key=>match[key])
		.filter(key=>key)
		.map((key,i)=> <Table.HeaderCell key={i}>{key}</Table.HeaderCell>);
		return keys
	}
	return (<Table.Header><Table.Row>
				<HeaderCells/>
			</Table.Row></Table.Header>)
}
const Body=({data,column})=>{
	const f=()=>{};
	const Cell=({cellsData})=>cellsData.map(([key,value])=>{
		const {onClick=f,style={}}=column.body.cell;
		const attrs={
				style, key,onClick:()=>onClick({key,value})
			}
			return	<Table.Cell {...{...attrs}}>{value}</Table.Cell>
	})
	const getTheRows=(row_,i)=>{
		const {rowAttr=f,onClick=f,exclude=""}=column.body.row;
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
const MyTabl2=props=>{
	const {data,column}=props;
	return (
		<Table color="blue" celled selectable inverted>
	        <Header {...{data,column}} />
	        <Body {...{data,column}}/>
    	</Table>
	);
}

export default MyTabl2;