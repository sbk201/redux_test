import React from "react";
// import PropTypes from "prop-types";
import firebase,{FirebaseUI} from '../fireAuth';


const getProps=props=>{
	return {}
}
const Home=props=>{
	props.checkUser();
	console.log(firebase.auth());
  	// const {sbus}=props;
  	// const {search}=getProps(props);
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;

	return (
		<div> 
		Home
			<br/>
			<FirebaseUI/>
		</div>
	);
}
export default Home