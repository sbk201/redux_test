import React from "react";
// import PropTypes from "prop-types";
import firebase,{FirebaseUI} from '../fireAuth';


const getProps=props=>{
	return {}
}
const Home=props=>{
	const {userProfile={}}=props;
	console.log(firebase.auth());
	// const Input=({refer,...rest})=><input ref={ele=>this[refer]=ele} {...{...rest}}/>;
	const UserState=()=>{
		const isLogged=userProfile || false;
		const email=userProfile&& userProfile.email;
		const state= isLogged ?
		email : 'not logged in';
		return <div>{state}</div>
	}
	const signOut=()=> firebase.auth().signOut().then(console.log('Signed Out'));
	return (
		<div> 
		Home
			<br/>
			<UserState/>
			<br/>
			<FirebaseUI/>
			<button onClick={signOut}>Sign Out</button>
		</div>
	);
}
export default Home