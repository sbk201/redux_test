import React from "react";
import UserBarC from '../containers/UserBarC';
// import PropTypes from "prop-types";
// import firebase from '../fireAuth';
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
		</div>
	);
}
export default Home