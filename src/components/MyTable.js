import React from "react";
import PropTypes from "prop-types";
import { Table } from 'semantic-ui-react'
import { mergeClone } from '../init/global'
import { Component } from 'react';
class MyTable extends Component {
	componentDidMount() {}
	render(){
		const {headObj,bodyObj}=this.props;
		// console.log(this.props);
		const header=(function (){
			const {array, style, contentFn}=headObj
			const match=title=>{
				const content= contentFn? contentFn(title): title;
				return <Table.HeaderCell style={style} key={title}>{content}</Table.HeaderCell>
			}
			return array.map(match)
		})();

		const body=(function(){
			const {array, style, rowAttrs}=bodyObj;
			const {array:titleArr}=headObj;
			// const match=text=>
			const convertAttr=(attrs,ele)=>{
				return Object.keys(attrs).reduce((accu,key)=>{
					const fn=attrs[key];
					if(typeof fn !=='function') console.error('rowAttrs must be function');
					const obj={[key]:fn(ele)};
					return mergeClone(accu,obj)
				},{})
			}
			const output=array.map((ele,index)=>{
				const attr=convertAttr(rowAttrs,ele);
				return <Table.Row key={index} {...attr}>
				{titleArr.map(title=>
					<Table.Cell key={title} style={style}> {ele[title]}</Table.Cell>
				)}
				</Table.Row>
			})
			return output;
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