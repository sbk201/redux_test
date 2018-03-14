import React from "react";
import PropTypes from "prop-types";
import { Table } from 'semantic-ui-react'
import { mergeClone } from '../init/global'
import { Component } from 'react';
class MyTable extends Component {
	componentDidMount() {}
	render(){
		const {headObj,bodyObj,name}=this.props;
		// console.log(this.props);
		const header=(function (){
			const {array, style, contentFn}=headObj
			const match=title=>{
				const content=(function(){
					if(name==='customer'){
						return contentFn ?
						contentFn(title) : title;
					}
				})();
				return <Table.HeaderCell style={style} key={title}>{content}</Table.HeaderCell>
			}
			return array.map(match)
		})();

		const body=(function(){
			const {array, style, rowAttrs}=bodyObj;
			const {array:titleArr}=headObj;
			const getRowAttr=ele=>{
				if(name==='customer') {
					const onClick=()=>bodyObj.clickFn(ele);
					return {active:!ele.selected,onClick}
				}
			}
			const match=((ele,index)=>{
				const attr=getRowAttr(ele);
				return <Table.Row key={index} {...attr}>
				{titleArr.map(title=>
					<Table.Cell key={title} style={style}> {ele[title]}</Table.Cell>
				)}
				</Table.Row>
			})
			return array.map(match);
		})();
	return (
		<Table color="blue" celled selectable inverted>
	        <Table.Header>
	          <Table.Row>
				{header}
	          </Table.Row>
	        </Table.Header>
	        <Table.Body>
	        	{body}
	        </Table.Body>
    	</Table>
	);
  	
  }
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/


export default MyTable;