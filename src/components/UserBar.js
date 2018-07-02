import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {authSignOut} from "../fireBase";


const getProps=props=>{
  const {userInfo,signOut}=props;
  const logged=userInfo && userInfo.logged;
  console.log('got',userInfo);
  const UserState=()=>{
    if(!logged) return <div></div>
    const {email,displayName}=userInfo;
    return <div>Hello {displayName} , email: {email}</div>
  }
  const OrInOut=()=> logged? 
  <div onClick={()=>authSignOut(signOut)}>Sign Out</div>
  :<Link to="./signIn">Sign In/Up</Link>
	return {UserState,OrInOut}
}
const UserBar=props=>{
  	// const {}=props;
  	const {UserState,OrInOut}=getProps(props);
      
	return (
		<div>  
      <OrInOut/>
      <UserState/>
		</div>
	);
}
export default UserBar