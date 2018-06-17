import React from "react";
import UserBarC from '../containers/UserBarC';
// import {coll} from '../fireBase';
import { Button } from 'semantic-ui-react'

// import PropTypes from "prop-types";
const byKey=key=>(a,b)=>a[key]>b[key];
const getProps=props=>{
	// const {}=props;''
	const Messages=({messages})=>{
		const byDate=(a,b)=>a.createdAt>=b.createdAt;
		return messages.sort(byKey('createdAt')).map((age,i)=>{
			const attrs={key:i,id:age.id};
			return <div {...{...attrs}}>{age.text}</div>
		})
	}
	return {Messages}
}
const ChatWindow=props=>{
	const {messages,addText}=props;
	const {Messages}=getProps(props);
	// const send=()=>coll('messages').add({text:this.text.value});
	const send=()=>addText(this.text.value);
	const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	return (
		<div> 
			ChatWindow
			<Messages {...{messages}} />
			<Input refer={"text"}></Input>
			<Button onClick={send}>send</Button>
		</div>
	);
}
export default ChatWindow