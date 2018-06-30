import React from "react";
import Modal from 'react-modal';
// import PropTypes from "prop-types";
import UserSign from '../components/UserSign';
import { Link } from "react-router-dom";


const getProps=props=>{
  const {userInfo}=props;
  const UserState=()=>{
    if(!userInfo) return <div></div>
    const {email,displayName}=userInfo;
    return <div>Hello {displayName} , email: {email}</div>
  }
  const Sign=()=> <div>{userInfo ? "Logout" : "Login"}</div>
	return {UserState,Sign}
}
const UserBar=props=>{
  	const {userInfo,checkUser,UI,updateUI}=props;
  	const {UserState,Sign}=getProps(props);
      
	return (
		<div>  
      <Link to="./signIn">Sign In/Up</Link>
      <UserState/>
		</div>
	);
}
export default UserBar