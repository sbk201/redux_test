import React from "react";
import {format as dateFormat} from 'date-fns'

const getProps=({addMessage})=>{
	const onSubmit=e=>{
		const text=e.target.value;
		const isEnter= e.charCode===13;
		if(isEnter) {
			addMessage(text);
			e.target.value='';
		};
	}
	return {onSubmit}
}

const MessageList=({message,delMessage})=> {
	const Message= ele=> {
		const date=dateFormat(ele.date,'h:mm:ss');
		return (<div>
			<button onClick={()=>delMessage(ele._id)}>X</button> 
			<span style={{width:"3em",margin:"0 1em"}}>{date}</span> {ele.text}
			</div>)
	}
	return message.map((ele,i)=><Message {...ele} key={i}/>)
}
const Todos=props=>{
	const {message,delMessage}=props;
	const {onSubmit}=getProps(props);
	return (
		<div>
			<div><input placeholder="Your message..." onKeyPress={e=>onSubmit(e)}/></div><br/>
			<MessageList {...{message,delMessage}}/>
		</div>
	);
}
// PropTypes Generator http://rmosolgo.github.io/prop-types/
export default Todos;