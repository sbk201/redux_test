import React from "react";
import Modal from 'react-modal';
// import PropTypes from "prop-types";
import UserSign from '../components/UserSign';

const getProps=props=>{
  const {userProfile}=props;
  const UserState=()=>{
    if(!userProfile) return <div></div>
    const {email,displayName}=userProfile;
    return <div>Hello {displayName} , email: {email}</div>
  }
  const Sign=()=> <div>{userProfile ? "Logout" : "Login"}</div>
	return {UserState,Sign}
}
const UserBar=props=>{
  	const {userProfile,checkUser,UI,updateUI}=props;
  	const {UserState,Sign}=getProps(props);
      
	return (
		<div>  
      <UserSign {...{userProfile,checkUser,UI,updateUI}}/>
      <UserState/>
		</div>
	);
}
export default UserBar