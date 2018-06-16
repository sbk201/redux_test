import React from "react";
import Modal from 'react-modal';
// import PropTypes from "prop-types";
import { Button } from 'semantic-ui-react'
import {signOut as _signOut,FirebaseUI} from '../fireAuth';
Modal.setAppElement('#root');

const getProps=props=>{
  	const {userProfile,checkUser,UI,updateUI}=props;
  	const toggleModal=()=> updateUI({modal:!UI.modal});
  	const signOut=()=>_signOut(checkUser);
  	const SignButton= ()=>userProfile ?
  		<Button onClick={signOut}>Sign Out</Button> : <Button onClick={toggleModal}>Sign In / Sign Up</Button>

	return {SignButton,UI,toggleModal}
}
const UserSign=props=>{
  	const {SignButton,UI,toggleModal}=getProps(props);
	return (
		<span> 
			<SignButton/>
			<Modal isOpen={UI.modal} shouldCloseOnOverlayClick={true} onRequestClose={toggleModal}>
				FirebaseUI
				<FirebaseUI/>
			</Modal>
		</span>
	);
}
export default UserSign