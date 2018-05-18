import React from "react";
import { Table } from 'semantic-ui-react'
import { Component } from 'react';
const Header=({data,column})=>{
	const HeaderCells=()=>{
		const {match}=column.head
		const keys=Object.keys(data[0])
		.map(key=>match[key])
		.map((key,i)=><Table.HeaderCell key={i}>{key}</Table.HeaderCell>);
		return keys
	}
	return (<Table.Header><Table.Row>
				<HeaderCells/>
			</Table.Row></Table.Header>)
}
const Body=({data,column})=>{
	const {onClick={},style={}}=column.body;
	// console.log(data)
	const getContent=(row,i)=>{
		const Cell=({rowData})=>rowData.map(([key,value],j)=>{
			const attrs={
					style, key:j,onClick:()=>onClick({key,value})
				}
				return	<Table.Cell {...{...attrs}}>{value}</Table.Cell>
		})
		return <Table.Row key={i}><Cell rowData={row}/></Table.Row>
	}
	const Content=()=>data.map(ele=>Object.entries(ele)).map(getContent)
	return <Table.Body><Content/></Table.Body>
}
const MyTabl2=props=>{
	const {data,column}=props;
	// console.log(column)
	// console.log(data)
	return (
		<Table color="blue" celled selectable inverted>
	        <Header {...{data,column}} />
	        <Body {...{data,column}}/>
    	</Table>
	);
}

export default MyTabl2;