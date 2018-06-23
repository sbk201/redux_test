import React from "react";
import UserBarConta from '../containers/UserBarConta';
import ChatWindowConta from '../containers/ChatWindowConta';

// import PropTypes from "prop-types";
// const getProps=props=>{
// 	const {}=props;
// 	return {}
// }
const Home=props=>{
	// const {}=getProps(props);
	return (
		<div> 
			<UserBarConta/>
			<br/>
			<ChatWindowConta/>
		</div>
	);
}
export default Home