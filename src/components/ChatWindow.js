import React from "react";
// import {coll} from '../fireBase';
import { Button } from 'semantic-ui-react'
import {_Input} from '../init/global';

// import PropTypes from "prop-types";
const byKey=key=>(a,b)=>a[key]>b[key];
const getProps=props=>{
	const {delText}=props;
	const Messages=({messages})=>{
		return messages.sort(byKey('createdAt')).map((age,i)=>{
			const Delete=()=><Button onClick={()=>delText(age.id)}>X</Button>
			const attrs={key:i,id:age.id};
			return <div {...{...attrs}}><Delete/> {age.user} : {age.text}</div>
		})
	}
	return {Messages}
}
const ChatWindow=props=>{
	const {messages,addText,userInfo:user}=props;
	const {Messages}=getProps(props);
  	const Input=_Input(this);
	// const send=()=>coll('messages').add({text:this.text.value});
	const send=()=>{
		const {username='NO-NAME',uid=null}=user;
		const params={
			text:this.text.value,
			createdAt:(new Date()),
			user:username, uid
		}
		addText(params);
	};
	return (
		<div> 

			<Messages {...{messages}} />
			<Input refer={"text"}></Input>
			<Button onClick={send}>send</Button>
		</div>
	);
}
export default ChatWindow