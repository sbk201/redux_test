import React from "react";
import UserBarC from '../containers/UserBarC';
import {coll} from '../fireBase';
import { Button } from 'semantic-ui-react'

// import PropTypes from "prop-types";
// const getProps=props=>{
// 	const {}=props;
// 	return {}
// }
const ChatWindow=props=>{

	const send=()=>coll('messages').add({text:'sbras'});
	// coll('messages').onSnapshot(function(doc) {
		// doc.docChanges().forEach(change=>console.log(change.doc));
	// });
	return (
		<div> 
			ChatWindow
			<Button onClick={send}>send</Button>
		</div>
	);
}
export default ChatWindow