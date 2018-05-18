import React from "react";
import { Table } from 'semantic-ui-react'
import { Component } from 'react';
const Header=({data,column})=>{
	const HeaderCells=()=>{
		const keys=Object.keys(data[0])
		.map(key=>column[key])
		.map((key,i)=><Table.HeaderCell key={i}>{key}</Table.HeaderCell>);
		return keys
	}
	return (<Table.Header><Table.Row>
				<HeaderCells/>
			</Table.Row></Table.Header>)
}
const Body=({data})=>{
	console.log(data)
	const Content=()=>data.map(ele=>Object.values(ele))
	.map((ele,i)=><Table.Row key={i}><Cell rowData={ele}/></Table.Row>)
	const Cell=({rowData})=>rowData.map((ele,i)=><Table.Cell key={i}>{ele}</Table.Cell>)
	{/*const Rows=({rowData})=> <Table.Row><Cell {...{rowData}}/></Table.Row>*/}
	// <Table.Cell>{ele}</Table.Cell>
	return <Table.Body><Content/></Table.Body>
}
const MyTabl2=props=>{
	const {data,column}=props;
	// console.log(column)
	// console.log(data)
	return (
		<Table color="blue" celled selectable inverted>
	        <Header {...{data,column}} />
	        <Body {...{data}}/>
    	</Table>
	);
}

export default MyTabl2;