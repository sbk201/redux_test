import React from "react";
// import PropTypes from "prop-types";
import firebase from '../init/firebase';

const getProps=props=>{
	return {}
}
const Home=props=>{
	console.log(firebase.auth());
  	// const {sbus}=props;
  	// const {search}=getProps(props);
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;

	return (
		<div> 
		Home
			<br/>
		</div>
	);
}
export default Home