import React from "react";
import Modal from 'react-modal';
// import PropTypes from "prop-types";
import { Message,Button } from 'semantic-ui-react'
import UserSign from './UserSign';

const getProps=props=>{
  const {userProfile}=props;
  const UserState=()=>{
    if(!userProfile) return <div></div>
    const {email,displayName}=userProfile;
    return <div>Hello {displayName} , email: {email}</div>
  }

	return {UserState}
}
const Main=props=>{
  	const {userProfile,checkUser,UI,updateUI}=props;
  	const {UserState}=getProps(props);
    // userProfile,checkUser,UI,updateUI
	return (
		<div>  
      <UserState/>
      <UserSign {...{userProfile,checkUser,UI,updateUI}}/>
		</div>
	);
}
export default Main