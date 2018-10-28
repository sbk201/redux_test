import React from "react";
import UserBarCont from '../containers/UserBarCont';
import ChatWindowCont from '../containers/ChatWindowCont';

// import PropTypes from "prop-types";
// const getProps=props=>{
// 	const {}=props;
// 	return {}
// }
const Home=props=>{
	// const {}=getProps(props);
	return (
		<div> 
			<UserBarCont/>
			<br/>
			<ChatWindowCont/>
		</div>
	);
}
export default Home