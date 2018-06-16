import React from "react";
import UserBarC from '../containers/UserBarC';
import ChatWindowContainer from '../containers/ChatWindowContainer';
import {coll} from '../fireBase';
import { Button } from 'semantic-ui-react'

// import PropTypes from "prop-types";
// const getProps=props=>{
// 	const {}=props;
// 	return {}
// }
const Home=props=>{
	// const {}=getProps(props);
	const {userProfile={}}=props;
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	return (
		<div> 
			<UserBarC/>
			<br/>
			<ChatWindowContainer/>
		</div>
	);
}
export default Home