import React from "react";
// import PropTypes from "prop-types";
import firebase,{FirebaseUI} from '../fireAuth';
import UserBar from './UserBar';
const getProps=props=>{
	const {userProfile}=props;
	const UserState=()=>{
		if(!userProfile) return <div>Not logged in</div>
		const {email,displayName}=userProfile;
		return <div>Hello {displayName} , email: {email}</div>
	}
	return {UserState}
}
const Home=props=>{
	const {UserState}=getProps(props);
	const {userProfile={},checkUser,UI,updateUI}=props;
	console.log(firebase.auth());
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	return (
		<div> 
			<UserBar {...{userProfile,checkUser,UI,updateUI}}/>
		</div>
	);
}
export default Home