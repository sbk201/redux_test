import React from "react";
import UserBarContainer from '../containers/UserBarContainer';
import ChatWindowContainer from '../containers/ChatWindowContainer';

// import PropTypes from "prop-types";
// const getProps=props=>{
// 	const {}=props;
// 	return {}
// }
const Home=props=>{
	// const {}=getProps(props);
	return (
		<div> 
			<UserBarContainer/>
			<br/>
			<ChatWindowContainer/>
		</div>
	);
}
export default Home