import React from "react";
// import PropTypes from "prop-types";
import firebase,{FirebaseUI} from '../fireAuth';


const getProps=props=>{
	return {}
}
const Home=props=>{
	const {userProfile={},checkUser}=props;
	console.log(firebase.auth());
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	const UserState=()=>{
		if(!userProfile) return <div>Not logged in</div>
		const {email,displayName}=userProfile;
		return <div>Hello {displayName} , email: {email}</div>
	}
	return (
		<div> 
		Home
			<br/>
			<UserState/>
			<br/>
			<FirebaseUI {...{userProfile,checkUser}}/>
		</div>
	);
}
export default Home