import React from "react";
import { Table } from 'semantic-ui-react';
import {omit} from "lodash"; 
import T from "prop-types";

const Header=({data,config})=>{
	const {match,style={}}=config.head || {}
	const HeaderCells=()=>{
		const matchKey=key=> match ? match[key] : key;
		const keys=Object.keys(data[0])
		.map(matchKey)
		.filter(key=>key)
		.map((key,i)=> <Table.HeaderCell key={i}>{key}</Table.HeaderCell>);
		return keys
	}
	return (<Table.Header {...{style}}><Table.Row>
				<HeaderCells/>
			</Table.Row></Table.Header>)
}
const Body=({data:rawData,config})=>{
	const configBody= config.body || {cell:{},row:{}}
	const data=(function() {
		const {page=1,entries=rawData.length}=configBody;
		return rawData.slice((page-1)*entries,page*entries);
		})();
	const f=()=>{};
	const Cell=({cellsData})=>cellsData.map(([key,value])=>{
		const {onClick=f,style={}}=configBody.cell;
		const attrs={
				style, key,onClick:()=>onClick({key,value})
			}
		const output= key==="Detail"? <div dangerouslySetInnerHTML={{__html: value}}></div> : value;
		return <Table.Cell {...{...attrs}}>{output}</Table.Cell>
	})
	const getTheRows=(row_,i)=>{
		const {rowAttr=f,onClick=f,exclude=""}=configBody.row;
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
		<Table style={{backgroundColor:'rgba(0,0,0, 0.15)'}} celled selectable inverted>
	        <Header {...{data,config}} />
	        <Body {...{data,config}}/>
    	</Table>
	);
}

MyTable.propTypes ={
	config:T.shape({
		head: T.shape({
			match: T.shape({}),
			style: T.shape({})
		}),
		body: T.shape({
			row: T.shape({}),
			cell: T.shape({})
		})
	}).isRequired
};
export default MyTable;